/* eslint-disable prefer-const */
import axios from 'axios';

import { format } from 'date-fns';

import UserPayloadMongo from '../schemas/UserPayloadMongo';
import UserMongo from '../schemas/UserMongo';

import { checkNewMatches } from '../Util/ProfilesMatchedUtil';
import { sendWelcomeMessage } from '../Util/SendWelcomeMessage';

class ProfilesMatchedController {
  async update(req, res) {
    // Chamada para pegar seguidores atualizados
    const response = await axios.get(
      `${process.env.BASE_URL}/getlistfollwers/${req.login}`
    );
    const currentFollowers = response.data;

    const user = await UserMongo.findOne(
      {
        _id: req.userPk,
      },
      '-whoIFollow -whoFollowMe -whoUnfollowedBySystem -followedUsersAtDate -unfollowedUsersAtDate -targetProfiles'
    );

    let { whoFollowedBySystem, matchedProfiles, nFollowers } = user;

    if (!matchedProfiles) {
      matchedProfiles = new Map();
    }

    // Atualizando numero de seguidores
    nFollowers.set(
      format(new Date(), "yyyy'-'MM'-'dd'T'HH':'mm':'ss"),
      currentFollowers.length
    );

    // Recuperando lista temporária de perfis seguidos durante o dia vigente
    const { tempFollowedProfiles } = await UserPayloadMongo.findById(
      req.userPk
    ).lean();

    const matchedProfilesAndNewMatches = await checkNewMatches(
      currentFollowers,
      whoFollowedBySystem,
      tempFollowedProfiles,
      matchedProfiles
    );

    // Recolocando nova lista de matches pra salvar no banco
    matchedProfiles = matchedProfilesAndNewMatches.machedProfiles;

    await UserMongo.findOneAndUpdate(
      { _id: req.userPk },
      { matchedProfiles, nFollowers }
    );

    // Enviando mensages de boas vindas com a promoção
    const responseOfSendMessages = await sendWelcomeMessage(
      matchedProfilesAndNewMatches.newMatches,
      req.login,
      req.userPk
    );

    if (responseOfSendMessages === 'Ok') {
      return res.status(200).json({ message: 'Ok' });
    }
    return res.status(400).json({ message: 'fail' });
  }
}

export default new ProfilesMatchedController();
