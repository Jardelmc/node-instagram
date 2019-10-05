import UserMongo from '../schemas/UserMongo';

class DirectMessageController {
  async switchActivation(req, res) {
    try {
      // Status: "on", "off"
      const { status } = req.body;

      if (!status) {
        return res
          .status(400)
          .json({ message: "Parâmetro inválido. Entre com: 'on' ou 'off'" });
      }

      let sendDirect = false;

      if (status === 'on') {
        sendDirect = true;
      }

      if (status === 'off') {
        sendDirect = false;
      }

      await UserMongo.findOneAndUpdate({ _id: req.userPk }, { sendDirect });

      return res.status(200).json({ statusDirect: status });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao fazer requisição' });
    }
  }

  async addNewWelcomeMessage(req, res) {
    try {
      const { message } = req.body;
      if (!message) {
        return res
          .status(400)
          .json({ error: 'Mensagem não enviada na requisição' });
      }

      const user = await UserMongo.findById(req.userPk);

      let { messagesToSendDirect } = user;

      if (!messagesToSendDirect) {
        messagesToSendDirect = [];
      }

      messagesToSendDirect.push(message);

      await UserMongo.findOneAndUpdate(
        { _id: req.userPk },
        { messagesToSendDirect }
      );

      return res.status(200).json({ mensagens: messagesToSendDirect });
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Houve um erro ao adicionar mensagem' });
    }
  }
}

export default new DirectMessageController();
