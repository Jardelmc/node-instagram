import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import LoginController from './app/controllers/LoginController';
import UserController from './app/controllers/UserController';
import TargetProfileController from './app/controllers/TargetProfileController';
import DialyFollowController from './app/controllers/DialyFollowController';
import DialyUnfollowController from './app/controllers/DialyUnfollowController';
import WelcomeMessagesController from './app/controllers/WelcomeMessagesController';
import ProfilesMatchedController from './app/controllers/ProfilesMatchedController';

import TestController from './Test/TestController';

const routes = new Router();

routes.post('/', TestController.getMongo);

routes.post('/login', LoginController.login);

routes.use(authMiddleware);

routes.post('/users/create', UserController.create);

routes.post(
  '/users/targetprofile/:targetprofile/add',
  TargetProfileController.create
);

routes.get('/getfollow', DialyFollowController.create);
routes.get('/getunfollow', DialyUnfollowController.create);

routes.put('/welcomemessages', WelcomeMessagesController.update);

routes.get('/checkfornewmatches', ProfilesMatchedController.update);

export default routes;
