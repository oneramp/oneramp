interface Response {
    success: boolean;
    status: number;
    message: string;
}
export default class OneRamp {
    private publicKey;
    private secretKey;
    constructor(publicKey: string, secretKey: string);
    private verifyCreds;
    withDraw(): Promise<Response>;
    deposit(): Promise<Response>;
    transactions(): Promise<Response>;
}
export {};
