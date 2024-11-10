import mongoose from 'mongoose';

const speakerSchema = new mongoose.Schema(
  {
    speaker_id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    current_employment: {
      type: String,
    },
    experience: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Speaker = mongoose.model('Speaker', speakerSchema);

export default Speaker;
