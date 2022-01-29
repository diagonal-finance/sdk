import { ChainId } from "./types";

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

export const supportedNetworks: ChainId[] = [networks.mumbai as number];
