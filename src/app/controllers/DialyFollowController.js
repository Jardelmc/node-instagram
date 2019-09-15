import axios from 'axios';
import UserMongo from '../schemas/UserMongo';
import {
  getAllProvidersAndProfiles,
  getSelectedProfilesToFollow,
} from '../Util/GetDialyFollows';

class DialyFollowController {
  async create(req, res) {
    const user = await UserMongo.findById(req.userPk).lean();

    const { targetProfiles, whoFollowedBySystem, whoIFollow } = user;

    const allProvidersAndProfilesToFollow = await getAllProvidersAndProfiles(
      targetProfiles
    );

    const selectedProfilesToFollow = await getSelectedProfilesToFollow(
      allProvidersAndProfilesToFollow,
      whoFollowedBySystem,
      whoIFollow
    );

    const response = await axios.post(
      `${process.env.BASE_URL}/dialyfollow/afonsoclaudio8888`,
      selectedProfilesToFollow
    );

    return res.json({ message: 'Ok' });
  }
}

export default new DialyFollowController();
