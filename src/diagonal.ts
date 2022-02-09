import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
} from "@apollo/client/core";
import fetch from "cross-fetch";
import { ethers } from "ethers";

import { IDiagonal, ISubscription } from "./interfaces";
import Subscription from "./subscription";
import { chainIds, subgraphUrls, supportedChains } from "./utils/consts";

/**
 * Diagonal is the main class of the SDK. It is the main
 * entry point, and a class that should be used to initialize the SDK.
 */
export default class Diagonal implements IDiagonal {
    // The `JsonRpcProvider` provider
    private _provider: ethers.providers.JsonRpcProvider | undefined;

    // The GraphQL client
    private _graphQlClient: ApolloClient<NormalizedCacheObject>;

    /**
     * Initialize a Diagonal object and create a `JsonRpcProvider` based on the
     * supplied arguments
     * @param network The network slug of the wanted network to connect to
     * @param rpc The RPC url of the wanted network to connect to
     */
    constructor(network: string, rpc?: string) {
        const chainId = chainIds[network];
        if (!chainId || !supportedChains.includes(chainId))
            throw new Error("Network unsupported");
        if (rpc) {
            this._provider = new ethers.providers.JsonRpcProvider(rpc, chainId);
        }

        this._graphQlClient = new ApolloClient({
            link: new HttpLink({ uri: subgraphUrls[network] as string, fetch }),
            cache: new InMemoryCache(),
        });
    }

    /**
     * Get the `JsonRpcProvider` provider.
     */
    public get provider(): ethers.providers.JsonRpcProvider | undefined {
        return this._provider;
    }

    /**
     * Get the GraphQL client
     */
    public get graphQlClient(): ApolloClient<NormalizedCacheObject> {
        return this._graphQlClient;
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
