/* eslint-disable import/prefer-default-export */
export async function checkNewMatches(
  currentFollowers, // List Long
  whoFollowedBySystem, // Map
  tempFollowedProfiles, // Map
  machedProfiles // Map
) {
  // Usuários seguidos pelo programa. Vou checar se eles estão presentes nos seguidores atuais,
  // Se tiver, checo se já não foi computado no matchedProfiles
  const newMatches = new Map();

  whoFollowedBySystem = new Map(Object.entries(whoFollowedBySystem));

  whoFollowedBySystem.forEach((value, key) => {
    // Se usuário seguido está na lista de seguidores atuais e ainda não foi computado, será
    if (currentFollowers.includes(Number(key)) && !machedProfiles.has(key)) {
      newMatches.set(key, value); // Adicionando usuário matched ao Map para envio de direct

      machedProfiles.set(key, value);
    }
  });

  if (tempFollowedProfiles) {
    tempFollowedProfiles = new Map(Object.entries(tempFollowedProfiles));
  } else {
    tempFollowedProfiles = new Map();
  }

  tempFollowedProfiles.forEach((value, key) => {
    // Se usuário seguido está na lista de seguidores atuais e ainda não foi computado, será
    if (currentFollowers.includes(key) && !machedProfiles.has(key)) {
      newMatches.set(key, value); // Adicionando usuário matched ao Map para envio de direct

      machedProfiles.set(key, value);
    }
  });

  const objectReturn = {
    machedProfiles,
    newMatches,
  };

  return objectReturn;
}
