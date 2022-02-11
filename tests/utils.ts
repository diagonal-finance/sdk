import { BigNumber } from "@ethersproject/bignumber";

import { networks, SubscriptionDetails } from "../src";

export interface TestState {
    chainId: number;
    networkName: string;
    networkSlug: string;
    rpc: string;
    userAddress: string;
    serviceAddress: string;
    tokenAddress: string;
    tokenAddressIncorrect: string;
    packageId: number;
    expectedSubscriptionDetails: SubscriptionDetails;
}

export const testState: TestState = {
    chainId: networks.mumbai as number,
    networkSlug: "mumbai",
    networkName: "maticmum",
    rpc: "https://matic-mumbai.chainstacklabs.com",
    userAddress: "0x4Ea66bE6947D711Ed963fc4aa8c04c5a4da6959B",
    serviceAddress: "0x1DCA1Ef1b350Edf51bB8fF5Ef2f74daD2934671d",
    tokenAddress: "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f",
    tokenAddressIncorrect: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    packageId: 1,
    expectedSubscriptionDetails: {
        totalInputFlowRate: BigNumber.from("115740740740740"),
        totalInputFeeRate: BigNumber.from("11574074074074"),
        numSubscriptions: 2,
        subscriberPackageIds: [1, 2],
        terminated: false,
    },
};
