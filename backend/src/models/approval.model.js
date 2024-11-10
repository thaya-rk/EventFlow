import mongoose from 'mongoose';

const approvalSchema = new mongoose.Schema(
  {
    approval_id: {
      type: String,
      required: true,
      unique: true,
    },
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    approver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Approved', 'Rejected'],
      required: true,
    },
    remarks: {
      type: String,
    },
    approval_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Approval = mongoose.model('Approval', approvalSchema);

export default Approval;
