import mongoose from 'mongoose';

const uploadSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    fileSizeKb: {
      type: Number,
      required: true,
      min: 0,
    },
    uploadedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    urlCount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['COMPLETED', 'IN PROGRESS', 'ARCHIVED'],
      default: 'COMPLETED',
    },
  },
  {
    timestamps: true,
  }
);

uploadSessionSchema.methods.toClientObject = function toClientObject() {
  return {
    id: this._id.toString(),
    title: this.title,
    fileName: this.fileName,
    fileSizeKb: this.fileSizeKb,
    uploadedAt: this.uploadedAt.toISOString(),
    date: this.date,
    time: this.time,
    urlCount: this.urlCount,
    status: this.status,
  };
};

export const UploadSession = mongoose.model('UploadSession', uploadSessionSchema);
