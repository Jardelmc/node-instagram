import axios from 'axios';

import UserMongo from '../schemas/UserMongo';
import { getProfilesToUnfollow } from '../Util/GetDialyUnfollow';

class DialyUnfollowController {
  async create(req, res) {
    const user = await UserMongo.findById(req.userPk).lean();

    const { followedUsersAtDate } = user;

    // Chamada para pegar seguidores atualizados
    let response = await axios.get(
      `${process.env.BASE_URL}/getlistfollwers/${req.login}`
    );

    const currentFollowers = response.data;

    const dialyUnfollowListPk = getProfilesToUnfollow(
      followedUsersAtDate,
      currentFollowers
    );

    if (dialyUnfollowListPk.length > 0) {
      response = await axios.post(
        `${process.env.BASE_URL}/dialyunfollow/${req.login}`,
        dialyUnfollowListPk
      );
    }

    return res.json({ message: 'Ok' });
  }
}

export default new DialyUnfollowController();
