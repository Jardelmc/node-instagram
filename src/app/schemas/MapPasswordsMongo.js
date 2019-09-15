import mongoose from 'mongoose';

const MapPasswordSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    login: {
      type: String,
    },
    password_hash: {
      type: Object,
    },
  },
  {
    collection: 'mapPassword',
  }
);

export default mongoose.model('MapPasswordMongo', MapPasswordSchema);
