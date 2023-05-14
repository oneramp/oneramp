import mongoose, { Document, Schema } from 'mongoose';

interface IStore extends Document {
  userId: string;
  storeName: string;
  category?: string;
  description?: string;
}

const storeModelSchema: Schema = new Schema({
  userId: {
    type: String, // or whatever type you want to use to represent userId
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
});

export default mongoose.model<IStore>('Store', storeModelSchema);
