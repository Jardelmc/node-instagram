import StalkerMongo from '../schemas/StalkerMongo';

class StalkerController {
  async index(req, res) {
    const stalkedUserList = await StalkerMongo.find({
      _id: { $in: req.body.stalkedUserPks },
    });

    return res.json(stalkedUserList);
  }
}

export default new StalkerController();
