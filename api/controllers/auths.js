const { default: axios } = require('axios');
const { v4: uuidv4 } = require('uuid');
const { models } = require('../db/models');
const { Sessions, Users } = models;
const moment = require('moment');
const { redisClient } = require('../redis');
const {
  SESSION_EXPIRY_TIME_IN_MS,
  REDIS_SESSION_KEY_PREFIX,
} = require('../utils/constants');

const login = async (req, res) => {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectURI = process.env.GOOGLE_REDIRECT_URI;
    const scope = 'profile email';
    const responseType = 'code';
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scope}`;

    res.json({
      data: {
        url: googleOAuthUrl,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      errors: [
        {
          message:
            'Oops! An unexpected server error occured. Please try logging in after some time.',
        },
        {
          message: error.message,
        },
      ],
    });
  }
};

const oAuthCallback = async (req, res) => {
  /**
   * @returns {
   *  code,
   *  scope,
   *  authuser,
   *  prompt
   * }
   */
  const { code } = req.query;
  const client_id = process.env.GOOGLE_CLIENT_ID;
  const redirect_uri = process.env.GOOGLE_REDIRECT_URI;
  const client_secret = process.env.GOOGLE_CLIENT_SECRET;

  try {
    /**
     * Exchange the authorization code for tokens
     * @returns {
     *  access_token,
     *  expires_in,
     *  scope,
     *  token_type,
     *  id_token
     * }
     */
    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const tokenResponse = await axios.post(tokenUrl, {
      client_id,
      client_secret,
      code,
      redirect_uri,
      grant_type: 'authorization_code',
    });

    const { access_token } = tokenResponse.data;

    /**
     * Use the access token to get user public profile info.
     * @returns {
     *  sub,
     *  name,
     *  given_name,
     *  email,
     *  family_name,
     *  picture,
     *  email_verified,
     *  locale
     * }
     */
    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${access_token}`
    );
    const { email, name, picture, given_name } = userInfo.data;

    let user = await Users.findOne({ where: { email } });
    if (!user) {
      /**
       * uuids are very large (36 characters) and we only want to use it to make usernames unique.
       * We can use the first 9 characters of uuidv4 because the probability of two uuids having same
       * initial 9 characters is infinitesimally small, so we're good to go.
       */
      const usernameUUID = uuidv4().split('-')[0];
      user = await Users.create({
        email,
        name,
        username: `${given_name}-${usernameUUID}`,
        avatar: picture,
      });
    }

    const session = await Sessions.findOne({ where: { userId: user.id } });
    let sessionFound = session !== null;

    if (session) {
      const expireOn = moment(session.updatedAt).add(
        session.expiresIn,
        'milliseconds'
      );
      const isSessionActive = expireOn.isAfter(moment(session.updatedAt));

      // It's because redis couldn't find the data maybe because connect.sid was missing, or the session expired so it was removed from redis.
      if (session.sessionId !== req.session.id) {
        await redisClient.del(
          `${REDIS_SESSION_KEY_PREFIX}${session.sessionId}`
        );

        // TODO (Lokesh): Later implement session restoration.
      }

      // If session active, then redis will use prev session id but if session is inactive then redis will use new session id.
      session.sessionId = req.session.id;

      // In case session has expired, we'll update the expiry time.
      if (!isSessionActive) {
        session.expiresIn = SESSION_EXPIRY_TIME_IN_MS;
      }
    }

    req.session.userId = user.id;

    if (sessionFound) {
      await session.save();
    } else {
      await Sessions.create({
        userId: user.id,
        sessionId: req.session.id,
        expiresIn: SESSION_EXPIRY_TIME_IN_MS,
      });
    }

    if (process.env.ENV === 'production') {
      res.redirect(`${process.env.REDIRECT_PROD_BASE_URL}/@me/tasks`);
    } else {
      res.redirect(`${process.env.REDIRECT_DEV_BASE_URL}/@me/tasks`);
    }

    // TODO: Send email to notify about login attempt.
  } catch (error) {
    console.log('Google OAuth login failed: ', error);
    res.status(401).json({
      errors: [
        {
          message: 'Google OAuth login failed',
        },
      ],
    });
  }
};

const logout = async (req, res) => {
  try {
    /**
     * Three cases in which userInfo might not be present in session data:
     * 1. when connect.sid is missing in the request header so redis couldn't attach session data witht the request.
     * 2. when session has expired.
     * 3. when somewhere in the codebase, this information was deleted.
     */
    if (!req.session || !req.session.userId) {
      res.status(200).json({
        data: {
          url: 'login',
        },
      });
      return;
    }

    const session = await Sessions.findOne({
      where: { userId: req.session.userId },
    });
    req.session.destroy(async (err) => {
      if (err) {
        console.log(err);
      }
      if (session) {
        await session.destroy({ force: true });
      }
      res.status(200).json({
        data: {
          url: 'login',
        },
      });
    });
  } catch (error) {
    console.log(err);
    res.status(200).json({
      data: {
        url: 'login',
      },
    });
  }
};

const getLoginStatus = async (req, res) => {
  try {
    let status = false;
    if (!req.session || !req.session.userId) {
      return res.status(200).json({
        data: {
          status,
        },
      });
    }

    const session = await Sessions.findOne({
      where: { userId: req.session.userId },
    });
    if (!session) {
      return res.status(200).json({
        data: {
          status,
        },
      });
    }

    status = true;
    res.status(200).json({
      data: {
        status,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [
        {
          message: err.message,
        },
      ],
    });
  }
};

module.exports = {
  login,
  logout,
  oAuthCallback,
  getLoginStatus,
};
