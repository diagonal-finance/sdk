import { BigNumber } from "@ethersproject/bignumber";
import { JsonRpcProvider } from "@ethersproject/providers";

import { IDiagonal, ISubscription } from "./interfaces";
import { getDiagonalServiceContract } from "./utils/contract";
import {
    getSubscriptionDetails as getSubscriptionDetailsSubgraph,
    validateSubscription as validateSubscriptionSubgraph,
} from "./utils/subgraph";

import { SubscriptionDetails } from ".";

/**
 * Subscription is a class encapsulating the logics
 * for interaction with Subscription entities. It should be used for
 * all of the subscription related operations.
 */
export default class Subscription implements ISubscription {
    // The address of the user
    private _userAddress: string;
    // The address of the service
    private _serviceAddress: string;
    // The SuperToken address
    private _superTokenAddress: string;
    // Instance of the Diagonal class
    private _diagonal: IDiagonal;

    /**
     * Instantiate a Subscription object based on the supplied arguments
     * @param diagonal Instance of the Diagonal class
     * @param userAddress The address of the user for which the subscription is associated with
     * @param serviceAddress The address of the service for which the subscription is associated with
     * @param superTokenAddress The address of the SuperToken for which the subscription is associated with
     */
    constructor(
        diagonal: IDiagonal,
        userAddress: string,
        serviceAddress: string,
        superTokenAddress: string
    ) {
        if (!diagonal || !diagonal.graphQlClient) {
            throw new Error("SDK not initialized.");
        }
        this._diagonal = diagonal;
        this._userAddress = userAddress;
        this._serviceAddress = serviceAddress;
        this._superTokenAddress = superTokenAddress;
    }

    /**
     * Get the on-chain subscription details for the subscription.
     * @returns A SubscriptionDetails object
     */
    public async getDetails(): Promise<SubscriptionDetails> {
        if (this._diagonal.provider) {
            return this.getDetailsRPC();
        } else {
            return getSubscriptionDetailsSubgraph(
                this._diagonal.graphQlClient,
                this._userAddress,
                this._superTokenAddress,
                this._serviceAddress
            );
        }
    }

    /**
     * Get subscription details via RPC
     * @returns A SubscriptionDetails object
     */
    private async getDetailsRPC(): Promise<SubscriptionDetails> {
        const serviceContract = getDiagonalServiceContract(
            this._serviceAddress,
            this._diagonal.provider as JsonRpcProvider
        );

        const subscriberState = await serviceContract.getSubscriberState(
            this._userAddress,
            this._superTokenAddress
        );

        const subscriptionDetails: SubscriptionDetails = {
            totalInputFlowRate: subscriberState.totalInputFlowRate,
            totalInputFeeRate: subscriberState.totalInputFeeRate,
            numSubscriptions: subscriberState.numSubscriptions.toNumber(),
            subscriberPackageIds: subscriberState.subscriberPackageIds.map(
                (item: BigNumber) => item.toNumber()
            ),
            terminated: subscriberState.terminated,
        };

        return subscriptionDetails;
    }

    /**
     * Validate that a subscription to a package exists.
     * @param packageId The package id for which the check is performed
     * @returns Boolean representing whether the subscription to a package is valid or not
     */
    public async validate(packageId: number): Promise<boolean> {
        if (this._diagonal.provider) {
            return this.validateFromRPC(packageId);
        } else {
            return validateSubscriptionSubgraph(
                this._diagonal.graphQlClient,
                this._userAddress,
                this._superTokenAddress,
                this._serviceAddress,
                packageId
            );
        }
    }

    /**
     * Validate the subscription using an RPC connection
     * @param packageId The package id for which the check is performed
     * @returns
     */
    private async validateFromRPC(packageId: number): Promise<boolean> {
        const subscriptionDetails = await this.getDetails();
        if (
            subscriptionDetails.numSubscriptions > 0 &&
            !subscriptionDetails.terminated
        ) {
            return subscriptionDetails.subscriberPackageIds.includes(packageId);
        }

        return false;
    }

    /**
     * Get the user address
     */
    public get userAddress(): string {
        return this._userAddress;
    }

    /**
     * Get the service address
     */
    public get serviceAddress(): string {
        return this._serviceAddress;
    }

    /**
     * Get the SuperToken address
     */
    public get superTokenAddress(): string {
        return this._superTokenAddress;
    }

    /**
     * Get the diagonal instance
     */
    public get diagonal(): IDiagonal {
        return this._diagonal;
    }
}
