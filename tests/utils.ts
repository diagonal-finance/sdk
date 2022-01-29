import { BigNumber } from "@ethersproject/bignumber";
import { networks, SubscriptionDetails } from "../src";

export interface TestState {
    network: number;
    networkName: string;
    rpc: string;
    userAddress: string;
    serviceAddress: string;
    tokenAddress: string;
    tokenAddressIncorrect: string;
    packageId: number;
    expectedSubscriptionDetails: SubscriptionDetails;
}

export const testState: TestState = {
    network: networks.mumbai,
    networkName: "maticmum",
    rpc: "https://rpc-mumbai.maticvigil.com/",
    userAddress: "0x4Ea66bE6947D711Ed963fc4aa8c04c5a4da6959B",
    serviceAddress: "0x7eD9eAFBE6239404E93e3F60f4F4081E821f064e",
    tokenAddress: "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f",
    tokenAddressIncorrect: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    packageId: 2,
    expectedSubscriptionDetails: {
        totalInputFlowRate: BigNumber.from("106095679012345"),
        totalInputFeeRate: BigNumber.from("9645061728395"),
        numSubscriptions: 2,
        subscriberPackageIds: [2, 3],
        terminated: false,
    },
};
