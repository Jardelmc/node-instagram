import UserMongo from '../schemas/UserMongo';

export async function followArrayChange(userPk, userFollowPk) {
  let { whoIUnfollow, whoIFollow } = await UserMongo.findOne({
    _id: userPk,
  });

  const objectFollow = whoIUnfollow.filter(x => {
    // eslint-disable-next-line no-underscore-dangle
    return x._id === userFollowPk;
  });

  whoIFollow = whoIFollow.concat(objectFollow);

  whoIUnfollow = whoIUnfollow.filter(x => {
    // eslint-disable-next-line no-underscore-dangle
    return x._id !== userFollowPk;
  });

  await UserMongo.updateOne(
    {
      _id: userPk,
    },
    { whoIFollow, whoIUnfollow }
  );
}

export async function unfollowArrayChange(userPk, userFollowPk) {
  let { whoIUnfollow, whoIFollow } = await UserMongo.findOne({
    _id: userPk,
  });

  const objectFollow = whoIFollow.filter(x => {
    // eslint-disable-next-line no-underscore-dangle
    return x._id === userFollowPk;
  });

  whoIUnfollow = whoIUnfollow.concat(objectFollow);

  whoIFollow = whoIFollow.filter(x => {
    // eslint-disable-next-line no-underscore-dangle
    return x._id !== userFollowPk;
  });

  await UserMongo.updateOne(
    {
      _id: userPk,
    },
    { whoIFollow, whoIUnfollow }
  );
}
