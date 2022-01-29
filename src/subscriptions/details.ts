import { getProvider } from "../init";
import { DiagonalServiceV1 } from "../artifacts/typechain/DiagonalServiceV1";
import DIAGONAL_SERVICE_ABI from "../artifacts//abi/v1/DiagonalServiceV1.json";

import { ethers } from "ethers";
import { SubscriptionDetails } from "../types";

export const subscriptionDetails = async (
    userAddress: string,
    serviceAddress: string,
    superTokenAddress: string
): Promise<SubscriptionDetails> => {
    const provider = getProvider();
    if (!provider) throw new Error("SDK not initialized");

    const serviceContract: DiagonalServiceV1 = <DiagonalServiceV1>(
        new ethers.Contract(serviceAddress, DIAGONAL_SERVICE_ABI, provider)
    );

    const subscriberState = await serviceContract.getSubscriberState(
        userAddress,
        superTokenAddress
    );

    const subscriptionDetails: SubscriptionDetails = {
        totalInputFlowRate: subscriberState.totalInputFlowRate,
        totalInputFeeRate: subscriberState.totalInputFeeRate,
        numSubscriptions: subscriberState.numSubscriptions.toNumber(),
        subscriberPackageIds: subscriberState.subscriberPackageIds.map((item) =>
            item.toNumber()
        ),
        terminated: subscriberState.terminated,
    };

    return subscriptionDetails;
};

export const isSubscribedToPackage = async (
    userAddress: string,
    serviceAddress: string,
    packageId: number,
    superTokenAddress: string
): Promise<boolean> => {
    const subDetails = await subscriptionDetails(
        userAddress,
        serviceAddress,
        superTokenAddress
    );

    if (subDetails.numSubscriptions > 0 && !subDetails.terminated) {
        return subDetails.subscriberPackageIds.includes(packageId);
    }

    return false;
};
