import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import LoginController from './app/controllers/LoginController';
import DashboardController from './app/controllers/DashboardController';
import TestController from './Test/TestController';

const routes = new Router();

routes.post('/api/front/login', LoginController.login);

routes.use(authMiddleware);

routes.get('/api/front/dashboard', DashboardController.index);

routes.get('/', TestController.getMongo);

export default routes;
