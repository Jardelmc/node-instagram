/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { format } from 'date-fns';

import UserMongo from '../schemas/UserMongo';

import { sendWelcomeMessage } from '../Util/SendDirectUtil';

export default async function CheckNewMatches(user) {
  const {
    whoFollowedBySystem,
    matchedProfiles,
    nFollowers,
    nFollowing,
    messagesToSendDirect,
  } = user;

  // Chamada para pegar seguidores atualizados || GAMBIARRA, PRECISO ALTERAR ESSA ROTA
  // Devolve um { whoIFollow, whoFollowMe }
  const response = await axios.post(`${process.env.BASE_URL}/users/create`, {
    userId: user._id,
  });

  const { whoFollowMe, whoIFollow } = response.data;

  // Para adicionar novos matches, afim de mandar direct
  const newMatches = [];

  // Para ficar mais fácil na hora de verificar se está contido aqui
  // const listOfAlreadyComputed = matchedProfiles.keys();

  // key = followerUserId, value = {provider, data}
  whoFollowedBySystem.forEach((value, key) => {
    if (whoFollowMe.includes(key) && !matchedProfiles.has(key)) {
      // Adiciono data de quando o match aconteceu
      value.matchedAt = new Date();
      // Adiciono no Map de matchedProfiles
      matchedProfiles.set(key, value);
      // Adiciono na lista de novos matches para envio de Direct
      newMatches.push(key);
    }
  });

  // Atualizando dados estatísticos no user
  let formattedKey = new Date();
  formattedKey = format(formattedKey, "yyyy'-'MM'-'dd'T'HH':'mm':'ss");

  nFollowers.set(formattedKey, whoFollowMe.length);
  nFollowing.set(formattedKey, whoIFollow.length);

  await UserMongo.findOneAndUpdate(
    { _id: user._id },
    { whoFollowMe, whoIFollow, matchedProfiles, nFollowers, nFollowing }
  );

  // Se o switch está como ON: (false)
  if (user.sendDirect) {
    console.log(
      `Enviando direct para ${newMatches.length} perfis - HORA: ${new Date()}`
    );
    sendWelcomeMessage(newMatches, messagesToSendDirect, user._id);
    return true;
  }

  return true;
}
