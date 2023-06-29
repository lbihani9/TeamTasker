const { default: axios } = require('axios');
const { v4: uuidv4 } = require('uuid');

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
          message: 'Oops! An unexpected server error occured.',
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
    const sessionId = uuidv4();

    req.session.session_id = sessionId;

    res.cookie('session_id', sessionId);
    res.redirect(`${process.env.REDIRECT_BASE_URL}/home`);
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

const logout = async (req, res) => {};

module.exports = {
  login,
  logout,
  oAuthCallback,
};
