import {expect, jest} from "@jest/globals";
import {CredentialManager} from "../../src/credential-manager/credential-manager";
import {hubConnection} from "signalr-no-jquery";
import {TestHubResponse} from "../model/test-hub-response";

jest.mock("signalr-no-jquery");
const mockHubConnection = jest.mocked(hubConnection);

describe("Credential Manager Tests", () => {

    it("Should initialise", async () => {
        //given
        const host: string = "localhost";
        const port: number = 123;

        const mockProxy = {
            hubName: "test"
        };

        const mockConnection = {
            createHubProxy: jest.fn().mockReturnValue(mockProxy),
            start: jest.fn((options, callback: () => void) => {
                callback.call(null);
            })
        };

        // @ts-expect-error We're not implementing everything within connection
        mockHubConnection.mockReturnValue(mockConnection);

        //when
        await new CredentialManager(host, port).initialise();

        //then
        expect(mockHubConnection.mock?.calls.length).toBe(1);
        expect(mockConnection.createHubProxy.mock.calls.length).toBe(1);
        expect(mockConnection.start.mock.calls.length).toBe(1);
    });

    it("Should return signed JWT", async () => {
        //given
        const host: string = "localhost";
        const port: number = 123;
        const input = "someJWT";
        const expected = new TestHubResponse();

        const invokeFn = jest.fn();
        invokeFn.mockReturnValue(new Promise((resolve) => resolve(expected)));

        const mockProxy = {
            invoke: invokeFn
        };

        const credentialManager = new CredentialManager(host, port);
        // @ts-expect-error We're not implementing everything within proxy
        credentialManager["_signingHub"] = mockProxy;

        //when
        const output = credentialManager.signJwt(input);

        //then
        expect(output);
    });
});