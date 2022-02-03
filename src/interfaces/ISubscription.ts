import { SubscriptionDetails } from "..";

export default interface ISubscription {
    getDetails(): Promise<SubscriptionDetails>;

    validate(packageId: number): Promise<boolean>;

    get userAddress(): string;

    get serviceAddress(): string;

    get superTokenAddress(): string;
}
