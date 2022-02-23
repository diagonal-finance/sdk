import { SubscriptionDetails } from "./types";

export const pad32Bytes = (data: string): string => {
    let s = data;
    while (s.length < (64 || 2)) {
        s = "0" + s;
    }
    return s;
};

export const decodeSubscriptionDetailsResult = (
    data: string
): SubscriptionDetails => {
    const bytes = data.slice(2);

    const gap = 64;

    const totalInputFlowRate = parseInt(bytes.slice(0, gap), 16);
    const totalInputFeeRate = parseInt(bytes.slice(gap, gap * 2), 16);
    const numSubscriptions = parseInt(bytes.slice(gap * 2, gap * 3), 16);
    let subscriberPackageIdsLength = parseInt(
        bytes.slice(gap * 4, gap * 5),
        16
    );
    let gapStart = gap * 5;

    // handle padding
    if (numSubscriptions > 0 && subscriberPackageIdsLength === 0) {
        subscriberPackageIdsLength = parseInt(
            bytes.slice(gap * 4, gap * 6),
            16
        );
        gapStart = gap * 6;
    }

    const subscriberPackageIds = [];

    for (let i = 0; i < subscriberPackageIdsLength; i++) {
        const packageId = parseInt(
            bytes.slice(gapStart, gapStart + gap * (i + 1)),
            16
        );
        subscriberPackageIds.push(packageId);
        gapStart = gapStart + gap * (i + 1);
    }

    const terminated = bytes.slice(gapStart);
    const isTerminated =
        terminated.length > 0
            ? parseInt(terminated, 16) > 0
                ? true
                : false
            : false;
    if (isTerminated) {
        return {
            totalInputFlowRate: "0",
            totalInputFeeRate: "0",
            numSubscriptions: 0,
            subscriberPackageIds: [],
            terminated: true,
        };
    }

    return {
        totalInputFlowRate: totalInputFlowRate.toString(),
        totalInputFeeRate: totalInputFeeRate.toString(),
        numSubscriptions: numSubscriptions,
        subscriberPackageIds: subscriberPackageIds,
        terminated: false,
    };
};
