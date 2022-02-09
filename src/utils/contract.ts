import { ethers } from "ethers";

import DIAGONAL_SERVICE_ABI from "../artifacts/abi/v1/DiagonalServiceV1.json";
import { DiagonalServiceV1 } from "../artifacts/typechain/DiagonalServiceV1";

/**
 * Instantiate a DiagonalServiceV1 contract from the input params
 * @param address The address of the contract
 * @param provider The ethers Provider
 * @returns An Instance of the DiagonalServiceV1 contract
 */
export const getDiagonalServiceContract = (
    address: string,
    provider: ethers.providers.Provider
): DiagonalServiceV1 => {
    const serviceContract: DiagonalServiceV1 = <DiagonalServiceV1>(
        new ethers.Contract(address, DIAGONAL_SERVICE_ABI, provider)
    );

    return serviceContract;
};
