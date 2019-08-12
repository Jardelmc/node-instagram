import UserMongo from '../schemas/UserMongo';

class DashboardController {
  async index(req, res) {
    const user = await UserMongo.findOne({ _id: req.userPk });

    return res.json(user);
  }
}

export default new DashboardController();
