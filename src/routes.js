import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import LoginController from './app/controllers/LoginController';
import DashboardController from './app/controllers/DashboardController';
import FollowController from './app/controllers/FollowController';
import TestController from './Test/TestController';

const routes = new Router();

routes.post('/api/front/login', LoginController.login);

routes.use(authMiddleware);

routes.get('/api/front/dashboard', DashboardController.index);

routes.put('/api/front/follow/user/one', FollowController.followOne);
routes.put('/api/front/unfollow/user/one', FollowController.unfollowOne);

routes.put('/api/front/follow/user/all', FollowController.followAll);
// routes.put('/api/front/unfollow/user/all', FollowController.unfollowAll);

routes.get('/', TestController.getMongo);

export default routes;
