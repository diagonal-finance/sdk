import { BigNumber } from "@ethersproject/bignumber";
import {
    init,
    getProvider,
    subscriptionDetails,
    isSubscribedToPackage,
} from "../src";
import { networks } from "../src";
import { testState } from "./utils";

describe("Subscription tests", () => {
    describe("Subscription details tests", () => {
        it("subscriptionDetails should fail if the SDK is not initialized", async () => {
            let provider = getProvider();
            expect(provider).toBeUndefined();

            await expect(
                subscriptionDetails(
                    testState.userAddress,
                    testState.serviceAddress,
                    testState.tokenAddress
                )
            ).rejects.toThrowError("SDK not initialized");
        });

        it("isSubscribedToPackage should fail if the SDK is not initialized", async () => {
            let provider = getProvider();
            expect(provider).toBeUndefined();

            await expect(
                isSubscribedToPackage(
                    testState.userAddress,
                    testState.serviceAddress,
                    2,
                    testState.tokenAddress
                )
            ).rejects.toThrowError("SDK not initialized");
        });

        it("subscriptionDetails should return correct results when subscription exists", async () => {
            let provider = getProvider();
            expect(provider).toBeUndefined();

            await init(testState.network, testState.rpc);

            const subscriptionDetailsResult = await subscriptionDetails(
                testState.userAddress,
                testState.serviceAddress,
                testState.tokenAddress
            );

            expect(subscriptionDetailsResult.numSubscriptions).toEqual(
                testState.expectedSubscriptionDetails.numSubscriptions
            );
            expect(
                subscriptionDetailsResult.totalInputFeeRate.toString()
            ).toEqual(
                testState.expectedSubscriptionDetails.totalInputFeeRate.toString()
            );
            expect(
                subscriptionDetailsResult.totalInputFlowRate.toString()
            ).toEqual(
                testState.expectedSubscriptionDetails.totalInputFlowRate.toString()
            );
            expect(subscriptionDetailsResult.subscriberPackageIds).toEqual(
                testState.expectedSubscriptionDetails.subscriberPackageIds
            );
            expect(subscriptionDetailsResult.terminated).toEqual(
                testState.expectedSubscriptionDetails.terminated
            );
        });

        it("subscriptionDetails should return correct results when subscription does not exist", async () => {
            const subscriptionDetailsResult = await subscriptionDetails(
                testState.userAddress,
                testState.serviceAddress,
                testState.tokenAddressIncorrect
            );

            expect(subscriptionDetailsResult.numSubscriptions).toEqual(0);
            expect(
                subscriptionDetailsResult.totalInputFeeRate.toString()
            ).toEqual("0");
            expect(
                subscriptionDetailsResult.totalInputFlowRate.toString()
            ).toEqual("0");
            expect(subscriptionDetailsResult.subscriberPackageIds).toEqual([]);
            expect(subscriptionDetailsResult.terminated).toEqual(false);
        });

        it("isSubscribedToPackage should return correct results when subscription exists", async () => {
            const isSubscribed = await isSubscribedToPackage(
                testState.userAddress,
                testState.serviceAddress,
                testState.packageId,
                testState.tokenAddress
            );

            expect(isSubscribed).toBe(true);
        });

        it("isSubscribedToPackage should return correct results when subscription does not exist", async () => {
            await init(testState.network, testState.rpc);
            const isSubscribed = await isSubscribedToPackage(
                testState.userAddress,
                testState.serviceAddress,
                testState.packageId,
                testState.tokenAddressIncorrect
            );
            expect(isSubscribed).toBe(false);
        });
    });
});
