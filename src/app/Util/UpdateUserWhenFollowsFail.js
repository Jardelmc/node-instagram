/* eslint-disable import/prefer-default-export */
import UserMongo from '../schemas/UserMongo';
import UserPayloadMongo from '../schemas/UserPayloadMongo';

export async function updateUserWhenFollowsFail(userPk) {
  const user = await UserMongo.findById(userPk).lean();

  let { whoFollowedBySystem } = user;

  whoFollowedBySystem = new Map(Object.entries(whoFollowedBySystem));

  const userPayloadFail = await UserPayloadMongo.findById(userPk).lean();

  const { tempFollowedProfiles } = userPayloadFail;

  const mapNewWhoFollowedBySystem = new Map();

  tempFollowedProfiles.forEach(followedProfile => {
    const infoFollowedData = {
      provider: followedProfile.provider,
      dateWhenFollowed: new Date(),
    };
    mapNewWhoFollowedBySystem.set(
      String(followedProfile.profileFollow),
      infoFollowedData
    );
  });

  mapNewWhoFollowedBySystem.forEach((value, key) => {
    whoFollowedBySystem.set(key, value);
  });

  await UserMongo.findOneAndUpdate({ _id: userPk }, { whoFollowedBySystem });

  await UserPayloadMongo.findOneAndUpdate(
    { _id: userPk },
    { tempFollowedProfiles: [], listSortedProfiles: [], statusOperation: false }
  );

  return true;
}
