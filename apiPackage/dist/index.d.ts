import { ethers, Signer } from "ethers";
import { IfcOneNetworksAddresses } from "./src/utils/address";
type Network = "bscTestnet" | "bsc" | "celo" | "alfajores" | "mumbai";
export declare class OneRamp {
    signer: Signer | undefined;
    provider: ethers.providers.Provider | undefined;
    network: Network;
    pubKey: string;
    secretKey: string;
    addresses: IfcOneNetworksAddresses;
    constructor(network: Network, pubKey: string, secretKey: string, provider?: ethers.providers.Provider, signer?: Signer);
    private verifyCreds;
    setSigner: (signer: Signer) => void;
    setProvider: (provider: ethers.providers.Provider) => void;
    offramp(tokenAddress: string, amount: number, phoneNumber: string): Promise<void>;
    quote(initialAmount: number, tokenAddress: string): Promise<{
        recives: number;
        estimated_fee: number;
        amount: number;
        asset: string;
        memo: string;
    }>;
}
export {};
