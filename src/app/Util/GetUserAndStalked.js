/* eslint-disable no-underscore-dangle */
import UserMongo from '../schemas/UserMongo';
import StalkerMongo from '../schemas/StalkerMongo';

// Declare frist call this
export async function getStalkedList(user) {
  let stalkedUserList = await StalkerMongo.find(
    {
      _id: { $in: user.usersStalked },
    },
    '-userFollowers -userFollowing'
  );

  if (!stalkedUserList) {
    stalkedUserList = [];
  }

  return stalkedUserList;
}

export async function produceUserFollowInformation(
  user,
  pkFollowersList,
  pkFollowingList
) {
  user.whoIFollow = user.whoIFollow.map(x =>
    pkFollowersList.includes(x._id)
      ? { ...x, iFollowThis: true, thisFollowMe: true }
      : { ...x, iFollowThis: true, thisFollowMe: false }
  );

  user.whoIUnfollow = user.whoIUnfollow.map(x =>
    pkFollowersList.includes(x._id)
      ? { ...x, iFollowThis: false, thisFollowMe: true }
      : { ...x, iFollowThis: false, thisFollowMe: false }
  );

  user.whoFollowMe = user.whoFollowMe.map(x =>
    pkFollowingList.includes(x._id)
      ? { ...x, iFollowThis: true, thisFollowMe: true }
      : { ...x, iFollowThis: false, thisFollowMe: true }
  );

  user.whoUnfollowMe = user.whoUnfollowMe.map(x =>
    pkFollowingList.includes(x._id)
      ? { ...x, iFollowThis: true, thisFollowMe: false }
      : { ...x, iFollowThis: false, thisFollowMe: false }
  );

  return user;
}

export async function produceStalkerFollowInformation(
  user,
  pkFollowersList,
  pkFollowingList
) {
  user.whoIFollow = user.whoIFollow.map(x =>
    pkFollowersList.includes(x._id)
      ? { ...x, thisFollowMe: true }
      : { ...x, thisFollowMe: false }
  );

  user.whoIFollow = user.whoIFollow.map(x =>
    pkFollowingList.includes(x._id)
      ? { ...x, iFollowThis: true }
      : { ...x, iFollowThis: false }
  );

  user.whoIUnfollow = user.whoIUnfollow.map(x =>
    pkFollowersList.includes(x._id)
      ? { ...x, thisFollowMe: true }
      : { ...x, thisFollowMe: false }
  );

  user.whoIUnfollow = user.whoIUnfollow.map(x =>
    pkFollowingList.includes(x._id)
      ? { ...x, iFollowThis: true }
      : { ...x, iFollowThis: false }
  );

  user.whoFollowMe = user.whoFollowMe.map(x =>
    pkFollowersList.includes(x._id)
      ? { ...x, thisFollowMe: true }
      : { ...x, thisFollowMe: false }
  );

  user.whoFollowMe = user.whoFollowMe.map(x =>
    pkFollowingList.includes(x._id)
      ? { ...x, iFollowThis: true }
      : { ...x, iFollowThis: false }
  );

  user.whoUnfollowMe = user.whoUnfollowMe.map(x =>
    pkFollowersList.includes(x._id)
      ? { ...x, thisFollowMe: true }
      : { ...x, thisFollowMe: false }
  );

  user.whoUnfollowMe = user.whoUnfollowMe.map(x =>
    pkFollowingList.includes(x._id)
      ? { ...x, iFollowThis: true }
      : { ...x, iFollowThis: false }
  );

  user.n_whoFollowMe = user.whoFollowMe.length;
  user.n_whoUnfollowme = user.whoUnfollowMe.length;
  user.n_whoIFollow = user.whoIFollow.length;
  user.n_whoIUnfollow = user.whoIUnfollow.length;

  return user;
}

export async function getUserAndStalkers(userPk) {
  let user = await UserMongo.findOne({
    _id: userPk,
  });

  const pkFollowersList = user.userFollowers.map(x => x._id);
  const pkFollowingList = user.userFollowing.map(x => x._id);

  user = await produceUserFollowInformation(
    user,
    pkFollowersList,
    pkFollowingList
  );

  const stalkedUserList = await getStalkedList(user);

  stalkedUserList.map(x => {
    produceStalkerFollowInformation(x, pkFollowersList, pkFollowingList);
  });

  user.n_whoFollowMe = user.whoFollowMe.length;
  user.n_whoUnfollowme = user.whoUnfollowMe.length;
  user.n_whoIFollow = user.whoIFollow.length;
  user.n_whoIUnfollow = user.whoIUnfollow.length;

  user.whoFollowMe.reverse();
  user.whoUnfollowMe.reverse();
  user.whoIFollow.reverse();
  user.whoIUnfollow.reverse();

  user.userFollowers = undefined;
  user.userFollowing = undefined;

  return { user, stalkedUserList };
}
