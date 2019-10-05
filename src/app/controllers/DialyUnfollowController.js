import axios from 'axios';

import UserMongo from '../schemas/UserMongo';
import { getProfilesToUnfollow } from '../Util/GetDialyUnfollow';

class DialyUnfollowController {
  async create(req, res) {
    const user = await UserMongo.findById(req.userPk);

    // Preciso ver quem que o programa seguiu na data D-4 e pegar destes os que não estão na lista de seguidores atualmente
    const { whoFollowedBySystem, username } = user;

    // Chamada para pegar seguidores atualizados
    let response = await axios.post(`${process.env.BASE_URL}/usersByUsername`, {
      userId: req.userPk,
      targetProfile: username,
    });

    const currentFollowers = response.data;

    const dialyUnfollowListPk = getProfilesToUnfollow(
      whoFollowedBySystem,
      currentFollowers
    );

    // Preparando objeto para Api Python reconhecer a origem e os perfis
    const dataFollowToPythonApi = {
      userId: String(req.userPk),
      profiles: dialyUnfollowListPk,
      token: req.token,
    };

    // Código para enviar lista para API Java, desativado pq to tentando fazer follow pelo python
    response = await axios.post(
      `${process.env.BASE_URL}/unfollowDialy`,
      dataFollowToPythonApi
    );

    if (response.status === 200) {
      return res.status(200).json({ message: 'Ok' });
    }
    return res
      .status(400)
      .json({ error: 'Serviço de Unfollow Dialy não iniciado' });
  }
}

export default new DialyUnfollowController();
