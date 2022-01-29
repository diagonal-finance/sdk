import { ethers } from "ethers";

import { supportedNetworks } from "./consts";
import { ChainId } from "./types";

let provider: ethers.providers.JsonRpcProvider | undefined;

export const init = async (
    network: ChainId,
    rpc: string
): Promise<ethers.providers.JsonRpcProvider> => {
    if (!supportedNetworks.includes(network)) {
        provider = undefined;
        throw new Error("Network unsupported");
    }
    provider = new ethers.providers.JsonRpcProvider(rpc, network);
    return provider;
};

export const getProvider = (): ethers.providers.JsonRpcProvider | undefined => {
    return provider;
};
