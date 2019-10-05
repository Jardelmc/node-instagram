/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable import/prefer-default-export */
import { subDays, format } from 'date-fns';

export function getProfilesToUnfollow(whoFollowedBySystem, currentFollowers) {
  const PAST_DATE = 1; // Quantos dias atrás a pessoa foi seguida

  const userIdsOfFollowedInPastDate = [];

  // Pegando data atual e diminuindo 4 dias e formatando para o padrão a ser comparado
  let targetDate = new Date();
  targetDate = subDays(targetDate, PAST_DATE);
  targetDate = format(targetDate, "yyyy'-'MM'-'dd");

  // Key = userFollowedId, Value = {provider, data}
  whoFollowedBySystem.forEach((value, key) => {
    let dateWhenFollowed = value.data; // Pegando a data
    dateWhenFollowed = format(dateWhenFollowed, "yyyy'-'MM'-'dd");

    // Se a data que o perfil foi seguido for igual a targetData (dias que o sistema espera antes de dar unfollow)
    // No segundo parấmetro é checado se o perfil não está na lista de seguidores atuais
    if (dateWhenFollowed === targetDate && !currentFollowers.includes(key)) {
      userIdsOfFollowedInPastDate.push(key);
    }
  });

  // Retorna ["userIds..."] para serem Unfollows
  return userIdsOfFollowedInPastDate;
}
