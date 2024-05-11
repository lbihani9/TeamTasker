const { default: axios } = require('axios');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../services/database');
const { Sessions, Users } = db;
const moment = require('moment');
const { SESSION_EXPIRY_TIME_IN_MS } = require('../utils/constants');
const { Op } = require('sequelize');
const nanoid = require('nanoid');

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

    /**
     * uuids are very large (36 characters) and we only want to use it to make usernames unique.
     * We can use the first 9 characters of uuidv4 because the probability of two uuids having same
     * initial 9 characters is infinitesimally small, so we're good to go.
     */
    const usernameUUID = uuidv4().split('-')[0];
    const [user, _] = await Users.findOrCreate({
      where: {
        email,
      },
      defaults: {
        email,
        name,
        username: `${given_name}-${usernameUUID}`,
        avatar: picture,
      },
    });

    const [session, isNewSession] = await Sessions.findOrCreate({
      where: {
        userId: user.id,
        expiresAt: {
          [Op.gt]: moment().toDate(),
        },
      },
      defaults: {
        userId: user.id,
        expiresAt: moment()
          .add(SESSION_EXPIRY_TIME_IN_MS, 'milliseconds')
          .toDate(),
        sessionId: nanoid(),
      },
    });

    if (isNewSession || !req.session) {
      req.session.session = session;
    }

    res.redirect(`${process.env.REDIRECT_URL}/@me/tasks`);

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
    if (!req.session?.session) {
      res.status(200).json({
        data: {
          url: 'login',
        },
      });
      return;
    }

    const { id } = req.session.session;
    const session = await Sessions.findByPk(id);

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
    if (!req.session?.session) {
      return res.status(200).json({
        data: {
          status,
        },
      });
    }

    const { id } = req.session.session;

    const session = await Sessions.findByPk(id);
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
