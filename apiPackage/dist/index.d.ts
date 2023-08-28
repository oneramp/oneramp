import { ethers, Signer } from "ethers";
import { KYCFormI } from "./types";
type Network = "bscTestnet" | "bsc" | "celo" | "alfajores" | "mumbai";
type Token = "stable" | "usdt" | "dai" | "0xc0EBB770F2c9CA7eD0dDeBa58Af101695Cf1BDc1";
export declare class OneRamp {
    private signer;
    provider: ethers.providers.Provider | undefined;
    network: Network;
    private pubKey;
    private secretKey;
    private addresses;
    constructor(network: Network, pubKey: string, secretKey: string, provider?: ethers.providers.Provider, signer?: Signer);
    private verifyCreds;
    private requiresUserKYCApproved;
    private createUserKYC;
    private setSigner;
    private setProvider;
    offramp(token: Token, amount: number, phoneNumber: string): Promise<void>;
    quote(initialAmount: number, token: Token): Promise<{
        recives: number;
        estimated_fee: number;
        amount: number;
        asset: Token;
        memo: string;
    }>;
    createKYCVerification(kycData: KYCFormI): Promise<KYCFormI | undefined>;
    getTransactions(): Promise<void>;
}
export {};
