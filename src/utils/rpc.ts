import fetch from "cross-fetch";

import { SubscriptionDetails } from "..";

import { decodeSubscriptionDetailsResult, pad32Bytes } from "./encoding";

export const getSubscriptionDetails = async (
    rpcUrl: string,
    subscriberAddress: string,
    superTokenAddress: string,
    serviceAddress: string
): Promise<SubscriptionDetails> => {
    const functionSignature = "0xd86397fd";
    const subscriberAddressPadded = pad32Bytes(subscriberAddress.slice(2));
    const superTokenAddressPadded = pad32Bytes(superTokenAddress.slice(2));
    const txData = `${functionSignature}${subscriberAddressPadded}${superTokenAddressPadded}`;

    const rpcRequest = {
        method: "eth_call",
        jsonrpc: "2.0",
        id: 1,
        params: [
            {
                data: txData,
                to: serviceAddress,
            },
            "latest",
        ],
    };

    const response = await fetch(rpcUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(rpcRequest),
    });

    const result = await response.json();
    const decodedResult = decodeSubscriptionDetailsResult(result.result);

    return decodedResult;
};

export const validateSubscription = async (
    rpcUrl: string,
    subscriberAddress: string,
    superTokenAddress: string,
    serviceAddress: string,
    packageId: number
): Promise<boolean> => {
    const subscriptionDetails = await getSubscriptionDetails(
        rpcUrl,
        subscriberAddress,
        superTokenAddress,
        serviceAddress
    );
    if (
        subscriptionDetails.numSubscriptions > 0 &&
        !subscriptionDetails.terminated
    ) {
        return subscriptionDetails.subscriberPackageIds.includes(packageId);
    }

    return false;
};
