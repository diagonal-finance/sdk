import { ChainId } from "./types";

// Object of common network:chainId mappings
export const chainIds: { [x: string]: number } = {
    goerli: 5,
    hardhat: 31337,
    kovan: 42,
    mainnet: 1,
    rinkeby: 4,
    ropsten: 3,
    mumbai: 80001,
    matic: 137,
    arbitrumRinkeby: 421611,
};

// Array of supported chains
export const supportedChains: ChainId[] = [
    chainIds.mumbai as number,
    chainIds.arbitrumRinkeby as number,
];

// subgraph urls
export const subgraphUrls: { [x: string]: string } = {
    mumbai: "https://api.thegraph.com/subgraphs/name/bdim1/diagonal-mumbai",
    arbitrumRinkeby: "https://api.thegraph.com/subgraphs/name/bdim1/diagonal",
};
