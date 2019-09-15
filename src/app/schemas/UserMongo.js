import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    username: {
      type: String,
    },
    whoIFollow: {
      type: Object,
    },
    whoFollowMe: {
      type: Object,
    },
    whoFollowedBySystem: {
      type: Object,
    },
    whoUnfollowedBySystem: {
      type: Object,
    },
    followedUsersAtDate: {
      type: Object,
    },
    unfollowedUsersAtDate: {
      type: Object,
    },
    nFollowers: {
      type: Map,
    },
    nFollowing: {
      type: Map,
    },
    targetProfiles: {
      type: Object,
    },
    matchedProfiles: {
      type: Map,
    },
  },
  { collection: 'user' }
);

export default mongoose.model('UserMongo', UserSchema);
