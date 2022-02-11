import { BigNumber } from "@ethersproject/bignumber";
import { Client } from "@urql/core";

import { SubscriptionDetails } from "..";

import {
    SUBSCRIPTION_DETAILS_QUERY,
    SUBSCRIPTION_VALID_QUERY,
} from "./subgraphQueries";

export const getSubscriberStreamId = (
    subscriberAddress: string,
    superTokenAddress: string,
    serviceAddress: string
): string => {
    return `${subscriberAddress}-${superTokenAddress}-${serviceAddress}`.toLowerCase();
};

export const getSubscriptionId = (
    subscriberAddress: string,
    superTokenAddress: string,
    serviceAdress: string,
    packageId: number
): string => {
    return `${subscriberAddress}-${serviceAdress}-${packageId}-${superTokenAddress}`.toLowerCase();
};

export const getSubscriptionDetails = async (
    client: Client,
    subscriberAddress: string,
    superTokenAddress: string,
    serviceAddress: string
): Promise<SubscriptionDetails> => {
    const subscriberStreamId = getSubscriberStreamId(
        subscriberAddress,
        superTokenAddress,
        serviceAddress
    );
    const result = await client
        .query(SUBSCRIPTION_DETAILS_QUERY, {
            id: subscriberStreamId.toLowerCase(),
        })
        .toPromise();

    const subscriptionDetails: SubscriptionDetails = {
        totalInputFlowRate: BigNumber.from(0),
        totalInputFeeRate: BigNumber.from(0),
        numSubscriptions: 0,
        subscriberPackageIds: [],
        terminated: false,
    };

    if (result.data && result.data["subscriberServiceStream"] !== null) {
        subscriptionDetails.totalInputFlowRate = BigNumber.from(
            result.data["subscriberServiceStream"]["totalStreamRate"]
        );
        subscriptionDetails.totalInputFeeRate = BigNumber.from(
            result.data["subscriberServiceStream"]["feeRate"]
        );
        subscriptionDetails.numSubscriptions =
            result.data["subscriberServiceStream"]["packageIds"].length;
        subscriptionDetails.subscriberPackageIds = result.data[
            "subscriberServiceStream"
        ]["packageIds"].map((packageId: string) => parseInt(packageId));
        subscriptionDetails.terminated =
            result.data["subscriberServiceStream"]["packageIds"].length === 0
                ? true
                : false;
    }
    return subscriptionDetails;
};

export const validateSubscription = async (
    client: Client,
    subscriberAddress: string,
    superTokenAddress: string,
    serviceAddress: string,
    packageId: number
): Promise<boolean> => {
    const subscriberStreamId = getSubscriptionId(
        subscriberAddress,
        superTokenAddress,
        serviceAddress,
        packageId
    );
    const result = await client
        .query(SUBSCRIPTION_VALID_QUERY, {
            id: subscriberStreamId.toLowerCase(),
        })
        .toPromise();
    let isValid = false;

    if (
        result.data &&
        result.data["paymentSubscription"] !== null &&
        result.data["paymentSubscription"]["state"] === "ACTIVE"
    ) {
        isValid = true;
    }

    return isValid;
};
