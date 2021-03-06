import { Diagonal, Subscription } from "../src";

import { testState } from "./utils";

// Subscription class tests
describe("Subscription tests", () => {
    describe("Subscription initialization tests", () => {
        it("Subscription should fail if the SDK is not initialized", async () => {
            expect(() => {
                new Subscription(
                    {} as Diagonal,
                    testState.userAddress,
                    testState.serviceAddress,
                    testState.tokenAddress
                );
            }).toThrowError("SDK not initialized");
        });

        it("Subscription should be initialized correctly", async () => {
            const diagonal = new Diagonal(testState.networkSlug, testState.rpc);
            const subscription = new Subscription(
                diagonal,
                testState.userAddress,
                testState.serviceAddress,
                testState.tokenAddress
            );
            expect(subscription.diagonal).toEqual(diagonal);
            expect(subscription.userAddress).toEqual(testState.userAddress);
            expect(subscription.serviceAddress).toEqual(
                testState.serviceAddress
            );
            expect(subscription.superTokenAddress).toEqual(
                testState.tokenAddress
            );
        });

        it("subscription initialization should be the same accross different paths", async () => {
            const diagonal = new Diagonal(testState.networkSlug, testState.rpc);
            const subscription = new Subscription(
                diagonal,
                testState.userAddress,
                testState.serviceAddress,
                testState.tokenAddress
            );
            const subscription1 = diagonal.getSubscription(
                testState.userAddress,
                testState.serviceAddress,
                testState.tokenAddress
            );

            expect(subscription.userAddress).toEqual(subscription1.userAddress);
            expect(subscription.serviceAddress).toEqual(
                subscription1.serviceAddress
            );
            expect(subscription.superTokenAddress).toEqual(
                subscription1.superTokenAddress
            );
        });
    });

    describe("Subscription details tests via RPC", () => {
        it("getDetails should return correct results when subscription exists", async () => {
            const diagonal = new Diagonal(testState.networkSlug, testState.rpc);

            const subscription = diagonal.getSubscription(
                testState.userAddress,
                testState.serviceAddress,
                testState.tokenAddress
            );

            const subscriptionDetailsResult = await subscription.getDetails();

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
            const diagonal = new Diagonal(testState.networkSlug, testState.rpc);

            const subscription = diagonal.getSubscription(
                testState.userAddress,
                testState.serviceAddress,
                testState.tokenAddressIncorrect
            );

            const subscriptionDetailsResult = await subscription.getDetails();

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

        it("subscriptionDetails should return correct results when subscription is terminated", async () => {
            const diagonal = new Diagonal(testState.networkSlug, testState.rpc);

            const subscription = diagonal.getSubscription(
                testState.userAddress,
                testState.serviceAddressTerminated,
                testState.tokenAddressTerminated
            );

            const subscriptionDetailsResult = await subscription.getDetails();

            expect(subscriptionDetailsResult.numSubscriptions).toEqual(0);
            expect(
                subscriptionDetailsResult.totalInputFeeRate.toString()
            ).toEqual("0");
            expect(
                subscriptionDetailsResult.totalInputFlowRate.toString()
            ).toEqual("0");
            expect(subscriptionDetailsResult.subscriberPackageIds).toEqual([]);
            expect(subscriptionDetailsResult.terminated).toEqual(true);
        });

        it("valide should return correct results when subscription exists", async () => {
            const diagonal = new Diagonal(testState.networkSlug, testState.rpc);

            const subscription = diagonal.getSubscription(
                testState.userAddress,
                testState.serviceAddress,
                testState.tokenAddress
            );

            const isSubscribed = await subscription.validate(
                testState.packageId
            );

            expect(isSubscribed).toBe(true);
        });

        it("isSubscribedToPackage should return correct results when subscription does not exist", async () => {
            const diagonal = new Diagonal(testState.networkSlug, testState.rpc);

            const subscription = diagonal.getSubscription(
                testState.userAddress,
                testState.serviceAddress,
                testState.tokenAddressIncorrect
            );

            const isSubscribed = await subscription.validate(
                testState.packageId
            );

            expect(isSubscribed).toBe(false);
        });
    });

    describe("Subscription details tests via Subgraph", () => {
        it("getDetails should return correct results when subscription exists", async () => {
            const diagonal = new Diagonal(testState.networkSlug);

            const subscription = diagonal.getSubscription(
                testState.userAddress,
                testState.serviceAddress,
                testState.tokenAddress
            );

            const subscriptionDetailsResult = await subscription.getDetails();

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
            const diagonal = new Diagonal(testState.networkSlug);

            const subscription = diagonal.getSubscription(
                testState.userAddress,
                testState.serviceAddress,
                testState.tokenAddressIncorrect
            );

            const subscriptionDetailsResult = await subscription.getDetails();

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

        it("valide should return correct results when subscription exists", async () => {
            const diagonal = new Diagonal(testState.networkSlug);

            const subscription = diagonal.getSubscription(
                testState.userAddress,
                testState.serviceAddress,
                testState.tokenAddress
            );

            const isSubscribed = await subscription.validate(
                testState.packageId
            );

            expect(isSubscribed).toBe(true);
        });

        it("isSubscribedToPackage should return correct results when subscription does not exist", async () => {
            const diagonal = new Diagonal(testState.networkSlug);

            const subscription = diagonal.getSubscription(
                testState.userAddress,
                testState.serviceAddress,
                testState.tokenAddressIncorrect
            );

            const isSubscribed = await subscription.validate(
                testState.packageId
            );

            expect(isSubscribed).toBe(false);
        });
    });
});
