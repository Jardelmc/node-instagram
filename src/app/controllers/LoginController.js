import axios from 'axios';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import UserController from './UserController';

import User from '../models/User';
import { getUserAndStalkers } from '../Util/GetUserAndStalked';

class LoginController {
  async login(req, res) {
    const { login, password_hash } = req.body;

    const password = password_hash;

    try {
      const response = await axios.post(`${process.env.BASE_URL}/login`, {
        login,
        password,
      });

      if (response.status !== 200) {
        return res.status(401).json({ error: 'loginFail' });
      }

      const instagram_pk = response.data;
      const userPk = Number(instagram_pk);

      const userExists = await User.findOne({
        where: { instagram_pk: userPk },
      });

      if (!userExists) {
        req.body.instagram_pk = userPk;
        await UserController.store(req);
      }

      if (response.status === 200) {
        const { user, stalkedUserList } = await getUserAndStalkers(userPk);

        return res.json({
          user,
          stalkedUserList,
          token: jwt.sign({ userPk, password, login }, authConfig.secret),
        });
      }
    } catch (err) {
      return res.status(401).json({ error: 'Erro ao fazer login' });
    }

    return res.status(401).json({ error: 'Erro ao fazer login' });
  }
}

export default new LoginController();
