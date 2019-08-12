import UserMongo from '../app/schemas/UserMongo';

import { getUserAndStalkers } from '../app/Util/GetUserAndStalked';

class TestController {
  async getMongo(req, res) {
    // const data = UserMongo.create({ username: 'jardel' });

    const user = await getUserAndStalkers(3574934963);

    return res.json(user);
  }
}

export default new TestController();
