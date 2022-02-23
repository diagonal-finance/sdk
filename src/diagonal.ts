import { IDiagonal, ISubscription } from "./interfaces";
import Subscription from "./subscription";
import { chainIds, supportedChains } from "./utils/consts";
import { NetworkSlug } from "./utils/types";

/**
 * Diagonal is the main class of the SDK. It is the main
 * entry point, and a class that should be used to initialize the SDK.
 */
export default class Diagonal implements IDiagonal {
    // RPC provider url
    private _rpcUrl: string | undefined;

    // The network slug
    private _network: NetworkSlug;

    /**
     * Initialize a Diagonal object and create a `JsonRpcProvider` based on the
     * supplied arguments
     * @param network The network slug of the wanted network to connect to
     * @param rpcUrl The RPC url of the desired network to connect to
     */
    constructor(network: NetworkSlug, rpcUrl?: string) {
        const chainId = chainIds[network];
        if (!chainId || !supportedChains.includes(chainId))
            throw new Error("Network unsupported");
        if (rpcUrl) {
            this._rpcUrl = rpcUrl;
        }

        this._network = network;
    }

    /**
     * Get the RPC url
     */
    public get rpcUrl(): string | undefined {
        return this._rpcUrl;
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
