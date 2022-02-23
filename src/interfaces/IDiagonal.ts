import { NetworkSlug } from "src/utils/types";

import ISubscription from "./ISubscription";

export default interface IDiagonal {
    getSubscription(
        userAddress: string,
        serviceAddress: string,
        superTokenAddress: string
    ): ISubscription;

    get rpcUrl(): string | undefined;

    get network(): NetworkSlug;
}
