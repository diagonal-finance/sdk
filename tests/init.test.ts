import { init, getProvider } from "../src";
import { networks, supportedNetworks } from "../src";
import { testState } from "./utils";

describe("Init tests", () => {
    describe("Init tests", () => {
        it("Should be initialized correctly when correct parameters are passed", async () => {
            let provider = getProvider();
            expect(provider).toBeUndefined();

            provider = await init(testState.network, testState.rpc);

            expect(provider).toBeDefined();
            const network = await provider.getNetwork();
            expect(network.chainId).toBe(testState.network);
            expect(network.name).toBe(testState.networkName);

            let providerNew = getProvider();
            expect(providerNew).toBe(provider);
        });

        it("Should fail when network is unsupported", async () => {
            let mainnet = networks.mainnet;
            expect(supportedNetworks).not.toContain(mainnet);

            await expect(init(mainnet, "")).rejects.toThrowError(
                "Network unsupported"
            );

            let provider = getProvider();
            expect(provider).toBeUndefined();
        });
    });
});
