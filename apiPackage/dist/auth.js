"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("./src/utils/request"));
class OneRamp {
    constructor(publicKey, secretKey) {
        /*
          Verify application creds middleware
          This is a private function, and it will only be accessed and called from the class body
        */
        this.verifyCreds = async () => {
            if (!this.publicKey || !this.secretKey) {
                return {
                    success: false,
                    status: 404,
                    message: "No Credentials detected!",
                };
            }
            const request = new request_1.default();
            /*
                Extract the wanted store information from the db by matching the public and secret key that was entered
                THIS LINE CAN BE REPLACED WITH AN EXTRACT CALL TO THE DB
            */
            const data = {
                clientId: this.publicKey,
                secret: this.secretKey,
            };
            const authenticated = await request.db(data);
            return authenticated;
        };
        this.publicKey = publicKey;
        this.secretKey = secretKey;
    }
    async withDraw() {
        const result = await this.verifyCreds();
        /* This will return true when the user creds are available in the db and false if they're not available */
        return result;
    }
    async deposit() {
        const result = await this.verifyCreds();
        /* This will return true when the user creds are available in the db and false if they're not available */
        return result;
    }
    async transactions() {
        const result = await this.verifyCreds();
        /* This will return true when the user creds are available in the db and false if they're not available */
        return result;
    }
}
exports.default = OneRamp;
