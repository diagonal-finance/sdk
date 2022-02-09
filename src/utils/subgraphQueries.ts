import gql from "graphql-tag";

export const SUBSCRIPTION_DETAILS_QUERY = gql`
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

export const SUBSCRIPTION_VALID_QUERY = gql`
    query SubscriptionDetails($id: ID!) {
        paymentSubscription(id: $id) {
            id
            state
        }
    }
`;
