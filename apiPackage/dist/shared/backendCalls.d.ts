import { CredentialsI, KYCFormI, KYCStatusI, UserCreds } from "../types";
export declare const getStoreAuthCreds: (clientId: string, secret: string) => Promise<any>;
export declare const getStoreKYCStatus: (storeId: string, appCreds: UserCreds) => Promise<KYCStatusI>;
export declare const createStoreUserKYC: (data: KYCFormI, credentials: CredentialsI) => Promise<KYCFormI>;
