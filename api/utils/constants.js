const SESSION_EXPIRY_TIME_IN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const REDIS_SESSION_KEY_PREFIX = 'session:';

module.exports = {
  SESSION_EXPIRY_TIME_IN_MS,
  REDIS_SESSION_KEY_PREFIX
}