import { ApolloClient, NormalizedCacheObject } from "@apollo/client/core";
import { ethers } from "ethers";

import ISubscription from "./ISubscription";

export default interface IDiagonal {
    getSubscription(
        userAddress: string,
        serviceAddress: string,
        superTokenAddress: string
    ): ISubscription;

    get provider(): ethers.providers.JsonRpcProvider | undefined;

    get graphQlClient(): ApolloClient<NormalizedCacheObject>;
}
