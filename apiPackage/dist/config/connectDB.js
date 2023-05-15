"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const MONGO_URI = process.env.MONGO_URI as string;
const MONGO_URI = "mongodb+srv://elias-hezron:elias-hezron@cashoutdatabase.7zdto1f.mongodb.net/?retryWrites=true&w=majority";
const connectDB = async () => {
    try {
        const connection = await mongoose_1.default.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
        });
        console.log(`MongoDB connected: ${connection.connection.host}`);
    }
    catch (error) {
        console.error(`ERROR: ${error.message}`);
        process.exit(1);
    }
};
exports.default = connectDB;
