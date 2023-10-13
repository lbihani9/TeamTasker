const processQueryParams = (query) => {};

/**
 *
 * @param {string} error
 * @param {string} defaultMessage
 *
 * @returns {object} {
 *    httpCode,
 *    message
 * }
 */

const controllerErrorHandler = (
  error,
  defaultMessage = 'An unexpected error occured'
) => {
  console.error(error);
  switch (error.name) {
    case 'SequelizeValidationError':
      return {
        statusCode: 403,
        message: error.errors[0].message || defaultMessage,
      };

    case 'SequelizeUniqueConstraintError':
      const path = error.errors[0].path;
      const value = error.errors[0].value;
      return {
        statusCode: 403,
        message: `${path} = '${value}' is already present.` || defaultMessage,
      };

    default:
      return {
        statusCode: 500,
        message: defaultMessage,
      };
  }
};

module.exports = {
  controllerErrorHandler,
};
