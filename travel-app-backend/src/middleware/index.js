const { contextMiddleware } = require('../auth/auth.middleware');

const appMiddleware = (app) => {
  app.use(contextMiddleware)
}

module.exports = appMiddleware;