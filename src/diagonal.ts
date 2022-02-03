import { ethers } from "ethers";

import Subscription from "./Subscription";
import { supportedNetworks } from "./consts";
import { IDiagonal, ISubscription } from "./interfaces";

/**
 * Diagonal is the main class of the SDK. It is the main
 * entry point, and a class that should be used to initialize the SDK.
 */
export default class Diagonal implements IDiagonal {
    // The `JsonRpcProvider` provider
    private _provider: ethers.providers.JsonRpcProvider;

    /**
     * Initialize a Diagonal object and create a `JsonRpcProvider` based on the
     * supplied arguments
     * @param chainId The chainId of the wanted network to connect to
     * @param rpc The RPC url of the wanted network to connect to
     */
    constructor(chainId: number, rpc: string) {
        if (!supportedNetworks.includes(chainId))
            throw new Error("Network unsupported");
        this._provider = new ethers.providers.JsonRpcProvider(rpc, chainId);
    }

    /**
     * Get the `JsonRpcProvider` provider.
     */
    public get provider(): ethers.providers.JsonRpcProvider {
        return this._provider;
    }

    /**
     * Create and return a Subscription object based on the
     * supplied arguments
     * @param userAddress The user address
     * @param serviceAddress The service address
     * @param superTokenAddress The SuperToken address
     * @returns A Subscription object
     */
    public getSubscription(
        userAddress: string,
        serviceAddress: string,
        superTokenAddress: string
    ): ISubscription {
        return new Subscription(
            this,
            userAddress,
            serviceAddress,
            superTokenAddress
        );
    }
}
