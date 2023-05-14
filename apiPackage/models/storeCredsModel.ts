import mongoose, { Document, Schema } from 'mongoose';

interface IStoreCreds extends Document {
  store: Schema.Types.ObjectId;
  clientId: string;
  secret: string;
}

const storeCredsModelSchema = new Schema<IStoreCreds>({
  store: {
    type: String,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
});

const StoreCreds = mongoose.model<IStoreCreds>("StoreCreds", storeCredsModelSchema);

export default StoreCreds;
