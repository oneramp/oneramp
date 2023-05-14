import mongoose, { Document, Schema } from 'mongoose';

interface IOffRamp extends Document {
  account_bank: string;
  account_number: string;
  amount: number;
  currency: string;
  reference: string;
  debit_currency: string;
  beneficiary_name: string;
  callback_url: string;
}

const offRampSchema = new Schema<IOffRamp>(
  {
    account_bank: {
      required: true,
      type: String,
      enum: ['MPS'],
    },
    account_number: {
      required: true,
      type: String,
    },
    amount: {
      required: true,
      type: Number,
    },
    currency: {
      required: true,
      type: String,
    },
    reference: {
      required: true,
      type: String,
    },
    debit_currency: {
      required: true,
      type: String,
      enum: ['UGX'],
    },
    beneficiary_name: {
      required: true,
      type: String,
      enum: ['cashout'],
    },
    callback_url: {
      require: true,
      type: String,
      enum: ['https://webhook.site/865479d1-cf68-48b0-b26f-b0d33c0936b4'],
    },
  },
  { timestamps: true }
);

const OffRamp = mongoose.model<IOffRamp>('OffRamp', offRampSchema);

export default OffRamp;
