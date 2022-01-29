import { ChainId } from "./types"

const networks: {[x: string]: number} = {
    mainnet: 1,
    mumbai: 1,
    matic: 1,
    rinkeby: 1,
}

export const supportedNetworks: ChainId[] = [networks.mumbai as number]