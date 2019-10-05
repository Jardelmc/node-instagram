import axios from 'axios';

import UserMongo from '../schemas/UserMongo';

import { createNewUser } from '../Util/CreateNewUserUtil';
import { updateUserWhenFollowsFail } from '../Util/UpdateUserWhenFollowsFail';

class UserController {
  async create(req, res) {
    const userExists = await UserMongo.findById(req.userPk).lean();

    if (!userExists) {
      const response = await axios.post(
        `${process.env.BASE_URL}/users/create`,
        {
          userId: String(req.userPk),
        }
      );

      if (response.status === 200) {
        const user = createNewUser(response.data);

        await UserMongo.create(user);

        return res.status(200).json(user);
      }
      return res.status(400).json({ message: 'Erro ao criar usuário' });
    }
    return res.status(400).json({ message: 'Usuário já está criado' });
  }

  async updateUserWhenFollowServiceFail(req, res) {
    const response = await updateUserWhenFollowsFail(req.userPk);

    if (response) {
      return res.json({ message: 'Ok' });
    }
    return res.json({ error: 'fail' });
  }
}

export default new UserController();
