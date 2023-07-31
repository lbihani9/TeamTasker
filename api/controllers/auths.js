const { default: axios } = require('axios');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../db/models');
const { Sessions, Users } = db.models;

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
        username: `${given_name}#${usernameUUID}`,
        avatar: picture,
      });
    }

    const session = await Sessions.findOne({ where: { email } });
    if (session) {
      if (session.sessionId !== req.session.id) {
        await session.destroy();
      }
    }

    if (!session) {
      req.session.userId = user.id;
      req.session.email = email;
      req.session.username = user.username;
      req.session.name = user.name;

      await Sessions.create({
        email,
        sessionId: req.session.id,
        expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      });
    }

    res.redirect(`${process.env.REDIRECT_BASE_URL}/dashboard`);

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
     * We should not try to delete the entry from sessions table for for followin reason:
     * We don't have session id, so we can't actually identify this person. Ideally, there
     * should be a middleware that would redirect the user back to login route if req.session.data isn't
     * present in the request. (This restriction is released for /login and /google/callback routes).
     */
    if (!req.session.email) {
      res.redirect(`${process.env.REDIRECT_BASE_URL}/dashboard`);
      return;
    }

    const { email } = req.session;

    const session = await Sessions.findOne({ where: { email } });
    req.session.destroy(async (err) => {
      if (err) {
        console.log(err);
      }
      if (session) {
        await session.destroy();
      }
    });

    res.redirect(`${process.env.REDIRECT_BASE_URL}`);
  } catch (error) {
    console.log(err);
    res.redirect(`${process.env.REDIRECT_BASE_URL}`);
  }
};

const getLoginStatus = async (req, res) => {
  try {
    let status = false;

    if (!req.session.email) {
      return res.status(200).json({
        data: {
          status,
        },
      });
    }

    const session = await Sessions.findOne({
      where: {
        email: req.session.email,
      },
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
        info: {
          email: req.session.email,
          username: req.session.username,
          name: req.session.name,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: [err.message],
    });
  }
};

module.exports = {
  login,
  logout,
  oAuthCallback,
  getLoginStatus,
};
