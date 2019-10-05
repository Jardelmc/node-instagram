import axios from 'axios';

import UserMongo from '../schemas/UserMongo';

class TargetProfileController {
  async createProvidersByTarget(req, res) {
    const { targetProfile } = req.body;

    const response = await axios.post(
      `${process.env.BASE_URL}/usersByUsername`,
      {
        userId: String(req.userPk),
        targetProfile,
      }
    );

    if (response.status === 200) {
      const user = await UserMongo.findById(req.userPk).lean();

      let { targetProfiles } = user;

      targetProfiles = new Map(Object.entries(targetProfiles)); // Convertendo de novo para MAP

      try {
        targetProfiles.set(targetProfile, response.data);
      } catch (error) {
        targetProfiles = new Map();
        targetProfiles.set(targetProfile, response.data);
      }

      await UserMongo.findOneAndUpdate({ _id: req.userPk }, { targetProfiles });

      return res.status(200).json({ message: 'Ok' });
    }
    return res.json(response.data);
  }

  async createProvidersByHashtag(req, res) {
    const { hashtags } = req.body;

    // Hashtags vem em formato de array, geralmente 2 por array ["foo", "bar"]
    const object = { userId: String(req.userPk), hashtags };

    // Request para obter array com hashtags em comum com seus devidos seguidores. Nenhum vem repetido
    const response = await axios.post(
      `${process.env.BASE_URL}/usersByHashtags`,
      object
    );

    // É preciso converter por causa do formato que vem
    const targetsByHashtags = response.data;
    const user = await UserMongo.findById(req.userPk);

    let mapToUpdate = user.targetHashtags;

    // mapToUpdate = new Map(Object.entries(mapToUpdate)); // Convertendo de novo para MAP

    if (!mapToUpdate) {
      mapToUpdate = new Map();
    }

    targetsByHashtags.forEach(data => {
      mapToUpdate.set(data.provider, data.users);
    });

    if (response.status === 200) {
      const userUpdated = await UserMongo.findOneAndUpdate(
        { _id: req.userPk },
        { targetHashtags: mapToUpdate },
        {
          new: true,
        }
      );

      return res.status(200).json(userUpdated);
    }
    return res.status(400).json({ error: 'Ocorreu um erro' });
  }
}

export default new TargetProfileController();

/* const stalkedUserList = await StalkerMongo.find({
  _id: { $in: req.body.stalkedUserPks },
}); */
