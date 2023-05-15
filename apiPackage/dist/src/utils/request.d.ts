declare class Request {
    apiUrl: string;
    constructor();
    db(data: any): Promise<{
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
    createTransaction(data: any): Promise<{
        status: number;
        success: boolean;
        message: string;
    }>;
}
export default Request;
