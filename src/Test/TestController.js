import UserMongo from '../app/schemas/UserMongo';

class TestController {
  async getMongo(req, res) {
    // const data = UserMongo.create({ username: 'jardel' });
    let { whoIFollow } = await UserMongo.findOne({
      _id: 3574934963,
    });

    whoIFollow = whoIFollow.filter(x => {
      return x._id !== 3197924638;
    });

    await UserMongo.updateOne(
      {
        _id: 3574934963,
      },
      { whoIFollow }
    );

    return res.json();
  }
}

export default new TestController();
