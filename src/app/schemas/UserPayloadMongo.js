import mongoose from 'mongoose';

const UserPayloadSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
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
  { collection: 'user_payload', timestamps: true }
);

export default mongoose.model('UserPayloadMongo', UserPayloadSchema);
