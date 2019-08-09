import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    username: {
      type: String,
    },
    n_followers: {
      type: Number,
    },
    n_following: {
      type: Number,
    },
    n_whoIFollow: {
      type: Number,
    },
    n_whoIUnfollow: {
      type: Number,
    },
    n_whoFollowMe: {
      type: Number,
    },
    n_whoUnfollowme: {
      type: Number,
    },
    profile_pic: {
      type: String,
    },
    userFollowers: {
      type: Array,
    },
    userFollowing: {
      type: Array,
    },
    whoFollowMe: {
      type: Array,
    },
    whoUnfollowMe: {
      type: Array,
    },
    whoIUnfollow: {
      type: Array,
    },
    whoIFollow: {
      type: Array,
    },
  },
  { collection: 'user' }
);

export default mongoose.model('UserMongo', UserSchema);
