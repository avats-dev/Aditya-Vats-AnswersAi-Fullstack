import initApiRoutes from './api';
const initRoutes = (app) => {
  app.use('/api', initApiRoutes());
};

module.exports = initRoutes;
