export interface IfcOneNetworksAddresses {
    contract: string;
    usdt: string;
    stable: string;
    dai: string;
    "0xc0EBB770F2c9CA7eD0dDeBa58Af101695Cf1BDc1"?: string;
}
export interface IfcAddresses {
    celo: IfcOneNetworksAddresses;
    alfajores: IfcOneNetworksAddresses;
    bsc: IfcOneNetworksAddresses;
    bscTestnet: IfcOneNetworksAddresses;
    mumbai: IfcOneNetworksAddresses;
}
declare const addresses: IfcAddresses;
export default addresses;
