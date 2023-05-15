import mongoose, { Document } from 'mongoose';
interface IStore extends Document {
    userId: string;
    storeName: string;
    category?: string;
    description?: string;
}
declare const _default: mongoose.Model<IStore, {}, {}, {}, mongoose.Document<unknown, {}, IStore> & Omit<IStore & {
    _id: mongoose.Types.ObjectId;
}, never>, any>;
export default _default;
