export interface IfcOneNetworksAddresses {
    contract: string;
    usdt: string;
    stable: string;
    dai: string;
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
