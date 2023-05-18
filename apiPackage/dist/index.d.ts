import { ethers, Signer } from "ethers";
import { IfcOneNetworksAddresses } from "./src/utils/address";
type Network = "bscTestnet" | "bsc" | "celo" | "alfajores";
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
    deposit(tokenAddress: string, amount: number): Promise<void>;
}
export declare class offramp {
    signer: Signer | undefined;
    provider: ethers.providers.Provider | undefined;
    network: Network;
    addresses: IfcOneNetworksAddresses;
    constructor(network: Network, provider?: ethers.providers.Provider, signer?: Signer);
    setSigner: (signer: Signer) => void;
    setProvider: (provider: ethers.providers.Provider) => void;
    approve(tokenAddress: string, amount: number): Promise<boolean>;
    deposit(tokenAddress: string, amount: number, phoneNumber: string): Promise<any>;
}
export {};
