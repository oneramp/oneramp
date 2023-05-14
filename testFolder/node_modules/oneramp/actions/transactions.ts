import connectDB from '../config/connectDB';

import TransactionModel from '../models/TransactionModel';


connectDB();

export async function createTransaction(newTransaction: any) {
    try {
      const transaction = new TransactionModel(newTransaction);
      const result = await transaction.save();
      return result;
    } catch (error: any) {
      console.error("Error creating transaction: ", error.message);
      // throw error;
      return error;
    }
  }
  