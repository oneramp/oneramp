import mongoose, { Document, Schema } from 'mongoose';
interface IStoreCreds extends Document {
    store: Schema.Types.ObjectId;
    clientId: string;
    secret: string;
}
declare const StoreCreds: mongoose.Model<IStoreCreds, {}, {}, {}, mongoose.Document<unknown, {}, IStoreCreds> & Omit<IStoreCreds & {
    _id: mongoose.Types.ObjectId;
}, never>, any>;
export default StoreCreds;
