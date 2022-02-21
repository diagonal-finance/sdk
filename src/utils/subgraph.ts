import fetch from "cross-fetch";
import { BigNumber } from "ethers";

import { SubscriptionDetails } from "..";

import { subgraphUrls } from "./consts";
import {
    SUBSCRIPTION_DETAILS_QUERY,
    SUBSCRIPTION_VALID_QUERY,
} from "./subgraphQueries";
import { NetworkSlug } from "./types";

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
    network: NetworkSlug,
    subscriberAddress: string,
    superTokenAddress: string,
    serviceAddress: string
): Promise<SubscriptionDetails> => {
    const subscriberStreamId = getSubscriberStreamId(
        subscriberAddress,
        superTokenAddress,
        serviceAddress
    );

    const subgraphUrl = subgraphUrls[network] as string;

    const response = await fetch(subgraphUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            query: SUBSCRIPTION_DETAILS_QUERY,
            variables: { id: subscriberStreamId },
        }),
    });

    const result = await response.json();

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
    network: NetworkSlug,
    subscriberAddress: string,
    superTokenAddress: string,
    serviceAddress: string,
    packageId: number
): Promise<boolean> => {
    const subscriptionId = getSubscriptionId(
        subscriberAddress,
        superTokenAddress,
        serviceAddress,
        packageId
    );
    const subgraphUrl = subgraphUrls[network] as string;
    const response = await fetch(subgraphUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            query: SUBSCRIPTION_VALID_QUERY,
            variables: { id: subscriptionId },
        }),
    });

    const result = await response.json();
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
