import WelcomeMessagesMongo from '../schemas/WelcomeMessagesMongo';

class WelcomeMessagesController {
  async update(req, res) {
    let messagesByUser = await WelcomeMessagesMongo.findById(req.userPk).lean();

    const { message } = req.body;

    if (!messagesByUser) {
      const messages = [];
      messages.push(message);
      const newMessage = { _id: req.userPk, messages };

      await WelcomeMessagesMongo.create(newMessage);

      return res.status(200).json(messagesByUser);
    }

    messagesByUser.messages.push(message);

    await WelcomeMessagesMongo.findOneAndUpdate;

    messagesByUser = await WelcomeMessagesMongo.findOneAndUpdate(
      { _id: req.userPk },
      messagesByUser,
      {
        new: true,
      }
    );

    return res.status(200).json(messagesByUser);
  }
}

export default new WelcomeMessagesController();
