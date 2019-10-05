import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import LoginController from './app/controllers/LoginController';
import UserController from './app/controllers/UserController';
import DialyFollowController from './app/controllers/DialyFollowController';
import DialyUnfollowController from './app/controllers/DialyUnfollowController';
import DirectMessageController from './app/controllers/DirectMessageController';

import TestController from './Test/TestController';
// import PromotionalCodeController from './app/controllers/PromotionalCodeController';
import TargetsController from './app/controllers/TargetsController';

const routes = new Router();

routes.post('/', TestController.getMongo);

// Rota para Aplicação Companion para resgatar informações sobre o código Instagram
// routes.get('/promotionalcode', PromotionalCodeController.getCodeData);

routes.post('/login', LoginController.login);

routes.use(authMiddleware);

routes.post('/users/create', UserController.create);

routes.post(
  '/users/targetprofile/add',
  TargetsController.createProvidersByTarget
);

// Rota para adicionar usuarios a partir de hashtags para alimentar o sistema de follow
routes.post(
  '/users/targetHashtags',
  TargetsController.createProvidersByHashtag
);

// Rota para serviço de Follow Dialy
routes.get('/getFollow', DialyFollowController.create);

// Rota para serviço de Unfollow Dialy
routes.get('/getUnfollow', DialyUnfollowController.create);

// Rota para adicionar nova mensagem de Direct
routes.put('/addDirectMessage', DirectMessageController.addNewWelcomeMessage);

// Rota para powerSwitch de envio de DirectMessage
routes.put('/statusDirectMessage', DirectMessageController.switchActivation);

// routes.get('/checkfornewmatches', ProfilesMatchedController.update);

// Rota para atualizar WhoFollowedBySystem quando dá problema na transmissão
routes.get('/updateWhenFail', UserController.updateUserWhenFollowServiceFail);

// Rota para atualizar followed Users partials
routes.post('/partialSafra', DialyFollowController.updateSafra);

export default routes;
