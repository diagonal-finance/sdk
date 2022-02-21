import { providers } from "ethers";
import { NetworkSlug } from "src/utils/types";

import ISubscription from "./ISubscription";

export default interface IDiagonal {
    getSubscription(
        userAddress: string,
        serviceAddress: string,
        superTokenAddress: string
    ): ISubscription;

    get provider(): providers.JsonRpcProvider | undefined;

    get network(): NetworkSlug;
}
