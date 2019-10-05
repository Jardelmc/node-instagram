/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */

export function createNewUser(partialUser) {
  const user = {
    _id: partialUser._id,

    username: partialUser.username,

    whoIFollow: partialUser.whoIFollow,

    whoFollowMe: partialUser.whoFollowMe,

    whoFollowedBySystem: new Map(),

    whoUnfollowedBySystem: new Map(),

    followedUsersAtDate: new Map(),

    unfollowedUsersAtDate: new Map(),

    nFollowers: new Map(),

    nFollowing: new Map(),

    targetProfiles: new Map(),

    matchedProfiles: new Map(),

    targetHashtags: new Map(),
  };

  return user;
}
