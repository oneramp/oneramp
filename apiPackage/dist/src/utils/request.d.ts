import { CredentialsI, KYCFormI, UserCreds } from "../../types";
declare class Request {
    apiUrl: string;
    constructor();
    db(data: UserCreds): Promise<{
        status: number;
        success: boolean;
        message: string;
        store: any;
    } | {
        status: number;
        success: boolean;
        message: string;
        store?: undefined;
    }>;
    kycApproved(data: UserCreds): Promise<unknown>;
    createKYC(data: KYCFormI, credentials: CredentialsI): Promise<any>;
    createTransaction(data: any): Promise<{
        status: number;
        success: boolean;
        message: string;
    }>;
}
export default Request;
