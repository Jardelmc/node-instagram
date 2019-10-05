import mongoose from 'mongoose';

const PromotionalCodeSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    profileTargetPk: {
      type: Number,
    },
    profileMasterPk: {
      type: Number,
    },
    message: {
      type: String,
    },
    avaliable: {
      type: Boolean,
      default: true,
    },
  },
  { collection: 'promotional_code', timestamps: true }
);

export default mongoose.model('PromotionalCodeMongo', PromotionalCodeSchema);
