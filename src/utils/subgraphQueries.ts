export const SUBSCRIPTION_DETAILS_QUERY = `
    query SubscriptionDetails($id: ID!) {
        subscriberServiceStream(id: $id) {
            id
            subscriber {
                id
            }
            superToken {
                id
            }
            service {
                id
            }
            totalStreamRate
            flowRate
            feeRate
            packageIds
        }
    }
`;

export const SUBSCRIPTION_VALID_QUERY = `
    query SubscriptionDetails($id: ID!) {
        paymentSubscription(id: $id) {
            id
            state
        }
    }
`;
