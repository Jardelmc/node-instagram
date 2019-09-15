/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */

export async function getAllProvidersAndProfiles(targetProfiles) {
  targetProfiles = new Map(Object.entries(targetProfiles));

  const arrayProvidersAndProfiles = [];

  targetProfiles.forEach((value, key) => {
    arrayProvidersAndProfiles.push({
      provider: key,
      profiles: Object.keys(value.whoFollowMe),
    });
  });

  return arrayProvidersAndProfiles;
}

export async function getSelectedProfilesToFollow(
  allProvidersAndProfilesToFollow,
  whoFollowedBySystem,
  whoIFollow
) {
  const arrayAllFollowedProfiles = Object.keys(whoFollowedBySystem);

  const arrayAllProfilesWhoIFollow = Object.keys(whoIFollow);

  const profilesNeverFollowed = [];

  allProvidersAndProfilesToFollow.forEach(provider => {
    const { profiles } = provider;

    const listPks = [];
    profiles.forEach(profileId => {
      if (
        !arrayAllFollowedProfiles.includes(profileId) &&
        !arrayAllProfilesWhoIFollow.includes(profileId)
      ) {
        listPks.push(profileId);
      }
    });

    const providerWithProfiles = {
      provider: provider.provider,
      profiles: listPks,
    };

    profilesNeverFollowed.push(providerWithProfiles);
  });

  return profilesNeverFollowed;
}
