import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    username: {
      type: String,
    },
    whoIFollow: {
      type: Array,
    },
    whoFollowMe: {
      type: Array,
    },
    whoFollowedBySystem: {
      type: Map,
    },
    whoUnfollowedBySystem: {
      type: Map,
    },
    followedUsersAtDate: {
      type: Map,
    },
    unfollowedUsersAtDate: {
      type: Map,
    },
    nFollowers: {
      type: Map,
    },
    nFollowing: {
      type: Map,
    },
    targetProfiles: {
      type: Map,
    },
    targetHashtags: {
      type: Map,
    },
    matchedProfiles: {
      type: Map,
    },
    allProfilesAlreadySystemInteracted: {
      type: Array,
    },
    profilesSelectedToFollowDialy: {
      type: Object, // Para controle da API python {providerTarget, providerHashtag, date}
    },
    statusOperationFollowDialy: {
      type: Boolean,
    },
    statusOperationUnfollowDialy: {
      type: Boolean,
    },
    sendDirect: {
      type: Boolean,
    },
    messagesToSendDirect: {
      type: Array,
    },
  },
  { collection: 'user' }
);

export default mongoose.model('UserMongo', UserSchema);
