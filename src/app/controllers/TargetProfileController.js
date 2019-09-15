import axios from 'axios';

class TargetProfileController {
  async create(req, res) {
    const response = await axios.post(
      `${process.env.BASE_URL}/users/${req.login}/targetprofile/${req.params.targetprofile}/add`
    );

    if (response.data === 'ok') {
      return res.status(200).json({ message: 'Ok' });
    }
    return res.json(response.data);
  }
}

export default new TargetProfileController();

/* const stalkedUserList = await StalkerMongo.find({
  _id: { $in: req.body.stalkedUserPks },
}); */
