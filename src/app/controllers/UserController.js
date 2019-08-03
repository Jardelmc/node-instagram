import User from '../models/User';

class UserController {
  async store(req) {
    await User.create(req.body);
  }
}

export default new UserController();
