import UserMongo from '../app/schemas/UserMongo';

class TestController {
  async getMongo(req, res) {
    // const data = UserMongo.create({ username: 'jardel' });
    const user = await UserMongo.findOne({ _id: 3574934963 });
    console.log(req.userPk);

    return res.json();
  }
}

export default new TestController();
