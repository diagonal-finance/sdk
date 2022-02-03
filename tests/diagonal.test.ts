import { Diagonal } from "../src";
import { networks, supportedNetworks } from "../src";

import { testState } from "./utils";

// Diagonal class tests
describe("Diagonal tests", () => {
    describe("Init tests", () => {
        it("Should be initialized correctly when correct parameters are passed", async () => {
            const diagonal = new Diagonal(testState.network, testState.rpc);
            const provider = diagonal.provider;

            expect(provider).toBeDefined();
            const network = await provider.getNetwork();
            expect(network.chainId).toBe(testState.network);
            expect(network.name).toBe(testState.networkName);
        });

        it("Should fail when network is unsupported", async () => {
            const mainnet = networks.mainnet;
            expect(supportedNetworks).not.toContain(mainnet);

            expect(() => {
                new Diagonal(mainnet as number, "");
            }).toThrowError("Network unsupported");
        });
    });

    describe("Subscriptions tests", () => {
        it("Subscription should be created successfully", async () => {
            const diagonal = new Diagonal(testState.network, testState.rpc);

            const subscription = diagonal.getSubscription(
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
    });
});
