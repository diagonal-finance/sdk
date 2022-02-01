import { ChainId } from "./types";

// Object of common networks
export const networks: { [x: string]: number } = {
    goerli: 5,
    hardhat: 31337,
    kovan: 42,
    mainnet: 1,
    rinkeby: 4,
    ropsten: 3,
    mumbai: 80001,
    matic: 137,
};

// Array of supported networks
export const supportedNetworks: ChainId[] = [networks.mumbai as number];
