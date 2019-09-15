import mongoose from 'mongoose';

const UserPayloadSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    lastFollowersListPk: {
      type: Array,
    },
    tempFollowedProfiles: {
      type: Array,
    },
    statusOperation: {
      type: Boolean,
    },
  },
  { collection: 'user-payload' }
);

export default mongoose.model('UserPayloadMongo', UserPayloadSchema);
