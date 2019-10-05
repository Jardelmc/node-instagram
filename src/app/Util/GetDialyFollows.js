/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */

/**
 * Esta função recebe um Map de profileTargets ou Hashtags com seus perfis.
 * Retorna uma lista de quem nunca foi selecionado antes
 */
export async function getSelectedProfilesToFollow(
  targetListOfProfiles, // Map (key='hashtag/targetProfile', value=["userIds"])
  whoIFollow, // Array["userIds"]
  whoFollowMe, // Array["userIds"]
  allProfilesAlreadySystemInteracted // Array["userIds"]
) {
  const selectedProfilesByList = [];

  // Vai pegar metade da lista de hashtags e metade da lista de profilesTargets
  const manyProfilesPerList = process.env.MAX_FOLLOWERS_DIALY / 2;

  // Quantidade total de perfis vindos da lista vigente dividido por quantas entradas existem na lista (targetProfiles, hashtags)
  let manyProfilesByInstance = manyProfilesPerList / targetListOfProfiles.size;

  manyProfilesByInstance = Math.trunc(manyProfilesByInstance);

  let countForStopForEach = 0;

  // Aqui tenho a lista com vários providers e ["usersIds"] dentro de cada provider
  // key = provider/hashtag || value = ["usersId"]
  for (const [key, value] of targetListOfProfiles.entries()) {
    const tempList = [];

    for (const userId of value) {
      // Checando para ver se já atingiu numero máximo por provider
      // ** Se um provider não tiver o mínimo esperado, ele nao será computado.
      if (
        countForStopForEach === manyProfilesByInstance &&
        tempList.length > 0
      ) {
        countForStopForEach = 0; // Reiniciando para próxima contagem

        // Adicionando galera quando atingiu limite
        const profilesFoundByLoop = { provider: key, profiles: tempList };
        selectedProfilesByList.push(profilesFoundByLoop);
        break;
      }

      if (
        !whoIFollow.includes(userId) && // Se nao esta na lista de quem sigo
        !whoFollowMe.includes(userId) && // Se já não me segue, nao tenho interesse em quem ja me segue
        !allProfilesAlreadySystemInteracted.includes(userId) // Se já não foi computado nesta instância
      ) {
        tempList.push(userId); // Adicionando na lista temporária para apender a lista daquela hashtag
        allProfilesAlreadySystemInteracted.push(userId); // Para nao selecionar mesmo perfil em momento algum posteriormente
        countForStopForEach += 1; // Se atingiu valor para esta hashtag, vai patar o forEach interno
      }
    }
  }

  /*   // key = hashtag/targetProfile, value = ["userIds"]
  targetListOfProfiles.forEach((value, key) => {
    const tempList = [];

    value.forEach(userId => {
      if (
        countForStopForEach === manyProfilesByInstance &&
        tempList.length > 0
      ) {
        countForStopForEach = 0; // Reiniciando para próxima contagem

        // Adicionando galera quando atingiu limite
        const profilesFoundByLoop = { provider: key, profiles: tempList };
        selectedProfilesByList.push(profilesFoundByLoop);
        return;
      }

      if (
        !whoIFollow.includes(userId) && // Se nao esta na lista de quem sigo
        !whoFollowMe.includes(userId) && // Se já não me segue, nao tenho interesse em quem ja me segue
        !allProfilesAlreadySystemInteracted.includes(userId) // Se já não foi computado nesta instância
      ) {
        tempList.push(userId); // Adicionando na lista temporária para apender a lista daquela hashtag
        allProfilesAlreadySystemInteracted.push(userId); // Para nao selecionar mesmo perfil em momento algum posteriormente
        countForStopForEach += 1; // Se atingiu valor para esta hashtag, vai patar o forEach interno
      }
    });
  }); */

  const objectReturn = {
    providerAndProfiles: selectedProfilesByList,
    allProfilesAlreadySystemInteracted,
  };

  return objectReturn;
}
