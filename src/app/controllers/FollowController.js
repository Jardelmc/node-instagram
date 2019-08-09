import axios from 'axios';

import {
  followArrayChange,
  unfollowArrayChange,
} from '../Util/UserFollowArrayUtil';

class FollowController {
  async followOne(req, res) {
    const { followUserPk } = req.body;

    try {
      await axios.put(
        `${process.env.BASE_URL}/follow/${req.login}/${followUserPk}/one`
      );

      await followArrayChange(req.userPk, followUserPk);

      return res.status(200).json({ status: 'ok' });
    } catch (error) {
      return res.status(400).json({ status: 'fail' });
    }
  }

  async followAll(req, res) {
    try {
      await axios.put(`${process.env.BASE_URL}/follow/${req.login}/all`);

      return res.status(200).json({ status: 'ok' });
    } catch (error) {
      return res.status(400).json({ status: 'fail' });
    }
  }

  async unfollowOne(req, res) {
    const { followUserPk } = req.body;

    try {
      await axios.put(
        `${process.env.BASE_URL}/unfollow/${req.login}/${followUserPk}/one`
      );

      await unfollowArrayChange(req.userPk, followUserPk);

      return res.status(200).json({ status: 'ok' });
    } catch (error) {
      return res.status(400).json({ status: 'fail' });
    }
  }
}

export default new FollowController();
