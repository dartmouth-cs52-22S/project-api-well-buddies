import mongoose, { Schema } from 'mongoose';

const profileSchema = new Schema(
  {
    email: String,
    name: String,
    stress: [String],
    calm: [String],
    pet: String,
    petName: String,
    activity: { lastSuggested: Date, activityName: String }
  },

);

const profileModel = mongoose.model('Profile', profileSchema);

export default profileModel;
