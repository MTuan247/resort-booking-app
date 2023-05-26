const { contextMiddleware } = require('../auth/auth.middleware');
const { errorHandlingMiddleware } = require('./error.middleware');

const appMiddleware = (app) => {
  app.use(errorHandlingMiddleware)
  app.use(contextMiddleware)
}

module.exports = appMiddleware;