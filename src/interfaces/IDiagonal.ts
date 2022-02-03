import { ethers } from "ethers";

import ISubscription from "./isubscription";

export default interface IDiagonal {
    getSubscription(
        userAddress: string,
        serviceAddress: string,
        superTokenAddress: string
    ): ISubscription;

    get provider(): ethers.providers.JsonRpcProvider;
}
