import { ethers } from "ethers";


import { ChainId } from "./types";
import { supportedNetworks } from "./consts";


let provider: ethers.providers.JsonRpcProvider;

export const init = async (network: ChainId, rpc: string): Promise<void> => {
    if(!supportedNetworks.includes(network)) throw new Error("Network unsupported");
    provider = new ethers.providers.JsonRpcProvider(rpc, network);
}

export const getProvider = (): ethers.providers.JsonRpcProvider => {
    return provider;
}