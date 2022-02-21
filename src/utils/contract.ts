import { Contract } from "ethers";
import { providers } from "ethers";

import DIAGONAL_SERVICE_ABI from "../abis/DiagonalServiceV1.json";

/**
 * Instantiate a DiagonalServiceV1 contract from the input params
 * @param address The address of the contract
 * @param provider The ethers Provider
 * @returns An Instance of the DiagonalServiceV1 contract
 */
export const getDiagonalServiceContract = (
    address: string,
    provider: providers.Provider
): Contract => {
    const serviceContract = new Contract(
        address,
        DIAGONAL_SERVICE_ABI,
        provider
    );

    return serviceContract;
};
