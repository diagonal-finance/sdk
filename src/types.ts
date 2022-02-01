import { BigNumber } from "@ethersproject/bignumber";

/** ChainId type */
export type ChainId = number;

/** Interface for the on-chain subscription details */
export interface SubscriptionDetails {
    totalInputFlowRate: BigNumber; // The total input flow rate for the subscription, from the user to the service for the SuperToken
    totalInputFeeRate: BigNumber; // The total feeRate paid by the user to Diagonal for the Subscriptions with the SuperToken
    numSubscriptions: number; // The total number of distinct subscriptions to the Service by the user
    subscriberPackageIds: number[]; // The packageIds that the user is subscribed to, to the Service with the SuperToken
    terminated: boolean; // Wether the Subscription is terminated
}
