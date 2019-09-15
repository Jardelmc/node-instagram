/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { encrypt } from '../Util/EncryptDecryptUtil';

import MapPasswordsMongo from '../schemas/MapPasswordsMongo';

class LoginController {
  async login(req, res) {
    const { login, password } = req.body;

    let userCredential = await MapPasswordsMongo.findById(login).lean();

    if (!userCredential) {
      userCredential = new MapPasswordsMongo({
        _id: login,
        login,
        password_hash: encrypt(password),
      });

      await userCredential.save();
    }

    try {
      const response = await axios.post(`${process.env.BASE_URL}/login`, {
        login,
        password,
      });

      if (response.status !== 200) {
        return res.status(401).json({ error: response.body });
      }

      const instagram_pk = response.data;
      const userPk = Number(instagram_pk);

      if (response.status === 200) {
        return res.json({
          token: jwt.sign({ userPk, login }, authConfig.secret),
        });
      }
    } catch (err) {
      return res.status(403).json({ error: 'Erro ao fazer login' });
    }

    return res.status(403).json({ error: 'Erro ao fazer login' });
  }
}

export default new LoginController();
