import { ethers } from "ethers";
import { setDiagonal } from "./config";

export default class Diagonal {

    private _provider: ethers.providers.JsonRpcProvider;

    constructor(chainId: number, rpc: string) {
        this._provider = new ethers.providers.JsonRpcProvider(rpc, chainId);
        setDiagonal(this);
    }

    public getProvider(): ethers.providers.JsonRpcProvider {
        return this._provider
    }
}

