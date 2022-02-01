import { SubscriptionDetails } from ".";
import { DiagonalServiceV1 } from "./artifacts/typechain/DiagonalServiceV1";
import { getDiagonal } from "./config";
import Diagonal from "./diagonal";
import { getDiagonalServiceContract } from "./utils";


export default class Subscription {

    private _userAddress: string;
    private _serviceAddress: string;
    private _superTokenAddress: string;
    private _diagonal: Diagonal;

    constructor(userAddress: string, serviceAddress: string, superTokenAddress: string) {
        this._diagonal = getDiagonal()
        if(!this._diagonal) {
            throw new Error("SDK is not initialized yet");
        }

        this._userAddress = userAddress;
        this._serviceAddress = serviceAddress;
        this._superTokenAddress = superTokenAddress;
    }

    public async getDetails(): Promise<SubscriptionDetails> {
    
        const serviceContract: DiagonalServiceV1 = getDiagonalServiceContract(this._serviceAddress, this._diagonal.getProvider());
    
        const subscriberState = await serviceContract.getSubscriberState(
            this._userAddress,
            this._superTokenAddress
        );
    
        const subscriptionDetails: SubscriptionDetails = {
            totalInputFlowRate: subscriberState.totalInputFlowRate,
            totalInputFeeRate: subscriberState.totalInputFeeRate,
            numSubscriptions: subscriberState.numSubscriptions.toNumber(),
            subscriberPackageIds: subscriberState.subscriberPackageIds.map((item) =>
                item.toNumber()
            ),
            terminated: subscriberState.terminated,
        };
    
        return subscriptionDetails;
    };


    public async validate(packageId: number): Promise<boolean> {
        const subscriptionDetails = await this.getDetails();

        if (subscriptionDetails.numSubscriptions > 0 && !subscriptionDetails.terminated) {
            return subscriptionDetails.subscriberPackageIds.includes(packageId);
        }
    
        return false;
    };
    


}