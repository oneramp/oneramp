import { ethers, Signer } from "ethers";
import { IfcOneNetworksAddresses } from "./src/utils/address";
type Network = "bscTestnet" | "bsc" | "celo" | "alfajores";
export default class OneRamp {
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
export {};
