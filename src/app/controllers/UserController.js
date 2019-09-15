import axios from 'axios';

import UserMongo from '../schemas/UserMongo';

class UserController {
  async create(req, res) {
    const userExists = await UserMongo.findById(req.userPk).lean();

    if (!userExists) {
      const response = await axios.post(
        `${process.env.BASE_URL}/users/${req.login}/create`
      );

      if (response.data === 'ok') {
        return res.status(200).json({ message: 'Ok' });
      }
      return res.status(400).json({ message: 'Erro ao criar usuário' });
    }
    return res.status(400).json({ message: 'Usuário já está criado' });
  }
}

export default new UserController();
