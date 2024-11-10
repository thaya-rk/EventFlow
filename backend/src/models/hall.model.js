import mongoose from 'mongoose';

const hallSchema = new mongoose.Schema(
  {
    hall_id: {
      type: String,
      required: true,
      unique: true,
    },
    hall_name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    availability_status: {
      type: String,
      enum: ['Available', 'Booked'],
      default: 'Available',
    },
  },
  { timestamps: true }
);

const Hall = mongoose.model('Hall', hallSchema);

export default Hall;
