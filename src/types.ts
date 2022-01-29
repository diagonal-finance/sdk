import { BigNumber } from "@ethersproject/bignumber";

export type ChainId = number;

export interface SubscriptionDetails {
    totalInputFlowRate: BigNumber;
    totalInputFeeRate: BigNumber;
    numSubscriptions: number;
    subscriberPackageIds: number[];
    terminated: boolean;
}
