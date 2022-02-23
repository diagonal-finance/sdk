import { networks, SubscriptionDetails } from "../src";
import { NetworkSlug } from "../src/utils/types";

export interface TestState {
    chainId: number;
    networkName: string;
    networkSlug: NetworkSlug;
    rpc: string;
    userAddress: string;
    serviceAddress: string;
    serviceAddressTerminated: string;
    tokenAddress: string;
    tokenAddressIncorrect: string;
    tokenAddressTerminated: string;
    packageId: number;
    expectedSubscriptionDetails: SubscriptionDetails;
}

export const testState: TestState = {
    chainId: networks.mumbai as number,
    networkSlug: "mumbai",
    networkName: "maticmum",
    rpc: "https://rpc-mumbai.maticvigil.com",
    userAddress: "0x4Ea66bE6947D711Ed963fc4aa8c04c5a4da6959B",
    serviceAddress: "0x1DCA1Ef1b350Edf51bB8fF5Ef2f74daD2934671d",
    serviceAddressTerminated: "0x3f578c3bFCE79964f4F616576211B30bf467e6f4",
    tokenAddress: "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f",
    tokenAddressIncorrect: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    tokenAddressTerminated: "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7",
    packageId: 1,
    expectedSubscriptionDetails: {
        totalInputFlowRate: "115740740740740",
        totalInputFeeRate: "11574074074074",
        numSubscriptions: 2,
        subscriberPackageIds: [1, 2],
        terminated: false,
    },
};
