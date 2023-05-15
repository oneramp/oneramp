import { Request, Response } from "express";
declare function getUserStore(req: Request, res: Response): Promise<void>;
declare function createStore(req: Request, res: Response): Promise<void>;
declare function getStore(req: Request, res: Response): Promise<void>;
declare function getStoreCreds(req: Request, res: Response): Promise<void>;
declare function getStoreTransactions(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function getCreds(req: Request, res: Response): Promise<void>;
declare function removeStore(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export { getUserStore, createStore, getStore, removeStore, getStoreCreds, getCreds, getStoreTransactions, };
