const { contextMiddleware } = require('./context.middleware');
const { errorHandlingMiddleware } = require('./error.middleware');

const appMiddleware = (app) => {
  app.use(contextMiddleware)
}

const afterMiddleware = (app) => {
  app.use(errorHandlingMiddleware)
}

module.exports = {appMiddleware, afterMiddleware};