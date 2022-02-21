import { providers } from "ethers";

import { IDiagonal, ISubscription } from "./interfaces";
import Subscription from "./subscription";
import { chainIds, supportedChains } from "./utils/consts";
import { NetworkSlug } from "./utils/types";

/**
 * Diagonal is the main class of the SDK. It is the main
 * entry point, and a class that should be used to initialize the SDK.
 */
export default class Diagonal implements IDiagonal {
    // The `JsonRpcProvider` provider
    private _provider: providers.JsonRpcProvider | undefined;

    // The network slug
    private _network: NetworkSlug;

    /**
     * Initialize a Diagonal object and create a `JsonRpcProvider` based on the
     * supplied arguments
     * @param network The network slug of the wanted network to connect to
     * @param rpc The RPC url of the wanted network to connect to
     */
    constructor(network: NetworkSlug, rpc?: string) {
        const chainId = chainIds[network];
        if (!chainId || !supportedChains.includes(chainId))
            throw new Error("Network unsupported");
        if (rpc) {
            this._provider = new providers.JsonRpcProvider(rpc, chainId);
        }

        this._network = network;
    }

    /**
     * Get the `JsonRpcProvider` provider.
     */
    public get provider(): providers.JsonRpcProvider | undefined {
        return this._provider;
    }

    /**
     * Get the network slug
     */
    public get network(): NetworkSlug {
        return this._network;
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
