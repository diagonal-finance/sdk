import { JsonRpcProvider } from "@ethersproject/providers";

import { Diagonal } from "../src";
import { NetworkSlug } from "../src/utils/types";

import { testState } from "./utils";

// Diagonal class tests
describe("Diagonal tests", () => {
    describe("Init tests", () => {
        it("Should be initialized correctly when correct parameters are passed", async () => {
            const diagonal = new Diagonal("mumbai", testState.rpc);
            const provider = diagonal.provider;
            const diagonalNetwork = diagonal.network;

            expect(provider).toBeDefined();
            expect(diagonalNetwork).toBeDefined();
            const network = await (provider as JsonRpcProvider).getNetwork();
            expect(network.chainId).toBe(testState.chainId);
            expect(network.name).toBe(testState.networkName);
        });

        it("Should fail when network is unsupported", async () => {
            expect(() => {
                new Diagonal("mainnet" as NetworkSlug);
            }).toThrowError("Network unsupported");
        });
    });

    describe("Subscriptions tests", () => {
        it("Subscription entity should be created successfully", async () => {
            const diagonal = new Diagonal(testState.networkSlug, testState.rpc);

            const subscription = diagonal.getSubscription(
                testState.userAddress,
                testState.serviceAddress,
                testState.tokenAddress
            );

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
