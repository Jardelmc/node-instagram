import mongoose from 'mongoose';

const WelcomeMessagesSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    messages: {
      type: Array,
    },
  },
  { collection: 'welcome-messages' }
);

export default mongoose.model('WelcomeMessagesMongo', WelcomeMessagesSchema);
