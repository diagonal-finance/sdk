import { ethers } from "ethers";
import { DiagonalServiceV1 } from "./artifacts/typechain/DiagonalServiceV1";

import DIAGONAL_SERVICE_ABI from "./artifacts//abi/v1/DiagonalServiceV1.json";

export const getDiagonalServiceContract = (address: string, provider: ethers.providers.Provider): DiagonalServiceV1 => {
    const serviceContract: DiagonalServiceV1 = <DiagonalServiceV1>(
        new ethers.Contract(address, DIAGONAL_SERVICE_ABI, provider)
    );

    return serviceContract;
}