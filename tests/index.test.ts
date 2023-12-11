import {signPrescription} from "../src";
import {PortRedirectionService} from "../src/credential-manager/port-redirection-service";
import {CredentialManager} from "../src/credential-manager/credential-manager";
import {PortResponse} from "../src/model/port-response";
import {PortData} from "../src/model/port-data";
import {HubResponse} from "../src/model/hub-response";
import {TestHubResponse} from "./model/test-hub-response";
import mocked = jest.mocked;

jest.mock("../src/credential-manager/port-redirection-service", () => {
    return {
        PortRedirectionService: jest.fn().mockImplementation(() => {
            return {
                locateService: () => {
                    return new Promise(resolve => {
                        resolve(new PortResponse(new PortData(123)));
                    });
                },
            };
        })
    };
});
jest.mock("../src/credential-manager/credential-manager", () => {
    return {
        CredentialManager: jest.fn().mockImplementation(() => {
            return {
                initialise: () => {
                    return new Promise<void>(resolve => resolve());
                },
                signJwt: () => {
                    return new Promise<HubResponse>(resolve => resolve(new TestHubResponse()));
                }
            };
        })
    };
});

describe("Index tests", () => {
    const MockedPortRedirectionService = mocked(PortRedirectionService);
    const MockedCredentialManager = mocked(CredentialManager);

    beforeEach(() => {
        MockedPortRedirectionService.mockClear();
        MockedCredentialManager.mockClear();
    });

    it("Should sign successfully", async () => {
        //given
        // set up in mocks

        //when
        const hubResponse = await signPrescription("testJWT");

        //then
        expect(JSON.stringify(hubResponse)).toBe(
            "{" +
            "\"certificate\":\"certificate\"," +
            "\"failed_signatures\":[]," +
            "\"message\":\"message\"," +
            "\"signatures\":[{\"id\":\"id\",\"signature\":\"signature\"}]," +
            "\"status_code\":0," +
            "\"status_string\":\"status_string\"," +
            "\"timestamp\":\"timestamp\"" +
            "}");
    });
});
