import {signPrescription} from "../src";
import {PortRedirectionService} from "../src/credential-manager/port-redirection-service";
import {CredentialManager} from "../src/credential-manager/credential-manager";
import {PortResponse} from "../src/model/port-response";
import {PortData} from "../src/model/port-data";
import {HubResponse} from "../src/model/hub-response";
import {TestHubResponse} from "./model/test-hub-response";
import mocked = jest.mocked;

const mockLocateService = jest.fn();
const mockInitialise = jest.fn();
const mockSign = jest.fn();

jest.mock("../src/credential-manager/port-redirection-service", () => {
    return {
        PortRedirectionService: jest.fn().mockImplementation(() => {
            return {
                locateService: mockLocateService,
            };
        })
    };
});
jest.mock("../src/credential-manager/credential-manager", () => {
    return {
        CredentialManager: jest.fn().mockImplementation(() => {
            return {
                initialise: mockInitialise,
                signJwt: mockSign
            };
        })
    };
});

describe("Index tests", () => {
    const mockedPortRedirectionService = mocked(PortRedirectionService);
    const mockedCredentialManager = mocked(CredentialManager);

    beforeEach(() => {
        mockedPortRedirectionService.mockClear();
        mockedCredentialManager.mockClear();
    });

    it("Should sign successfully", async () => {
        //given
        const input = "testJWT";
        const expectedResponse = new TestHubResponse();

        mockLocateService.mockImplementation(() => {
            return new Promise(resolve => {
                resolve(new PortResponse(new PortData(123)));
            });
        });

        mockInitialise.mockImplementation(() => {
            return new Promise<void>(resolve => resolve());
        });

        mockSign.mockImplementation(() => {
            return new Promise<HubResponse>(resolve => resolve(expectedResponse));
        });

        //when
        const hubResponse = await signPrescription(input);

        //then
        expect(hubResponse).toBe(expectedResponse);

        expect(mockedPortRedirectionService.mock.calls.length).toBe(1);
        expect(mockedCredentialManager.mock.calls.length).toBe(1);

        expect(mockLocateService).toHaveBeenCalled();
        expect(mockInitialise).toHaveBeenCalled();
        expect(mockSign).toHaveBeenCalledWith(input);
    });
});
