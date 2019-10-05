/* eslint-disable import/prefer-default-export */
export async function checkNewMatches(
  currentFollowers, // List Long
  whoFollowedBySystem, // Map
  tempFollowedProfiles, // Map
  matchedProfiles // Map
) {
  // Usuários seguidos pelo programa. Vou checar se eles estão presentes nos seguidores atuais,
  // Se tiver, checo se já não foi computado no matchedProfiles
  const newMatches = new Map();

  whoFollowedBySystem = new Map(Object.entries(whoFollowedBySystem));

  whoFollowedBySystem.forEach((value, key) => {
    // Se usuário seguido está na lista de seguidores atuais e ainda não foi computado, será
    if (currentFollowers.includes(Number(key)) && !matchedProfiles.has(key)) {
      newMatches.set(key, value); // Adicionando usuário matched ao Map para envio de direct

      matchedProfiles.set(key, value);
    }
  });

  // tempFollowedProfiles fica salvo no banco como um array, e cada objeto tem um campo: provider e profileFollow
  // Precisa converter esse array em um Map no modelo no qual é salvo os matchedProfiles
  const tempFollowedProfilesMap = new Map();
  if (tempFollowedProfiles) {
    tempFollowedProfiles.forEach(followedProfileInfo => {
      const mapObject = {
        provider: followedProfileInfo.provider,
        dateWhenFollowed: new Date(),
      };

      const key = String(followedProfileInfo.profileFollow);
      tempFollowedProfilesMap.set(key, mapObject);
    });
  }

  tempFollowedProfilesMap.forEach((value, key) => {
    // Se usuário seguido está na lista de seguidores atuais e ainda não foi computado, será
    if (currentFollowers.includes(Number(key)) && !matchedProfiles.has(key)) {
      newMatches.set(key, value); // Adicionando usuário matched ao Map para envio de direct

      matchedProfiles.set(key, value);
    }
  });

  const objectReturn = {
    matchedProfiles,
    newMatches,
  };

  return objectReturn;
}
