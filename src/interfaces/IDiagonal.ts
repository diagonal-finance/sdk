import { JsonRpcProvider } from "@ethersproject/providers";
import { Client } from "@urql/core";

import ISubscription from "./ISubscription";

export default interface IDiagonal {
    getSubscription(
        userAddress: string,
        serviceAddress: string,
        superTokenAddress: string
    ): ISubscription;

    get provider(): JsonRpcProvider | undefined;

    get graphQlClient(): Client;
}
