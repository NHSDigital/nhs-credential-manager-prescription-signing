import {validateHubResponse} from "../../src/validation/response-validator";
import {TestHubResponse} from "../model/test-hub-response";

describe("Response Validator tests", () => {

    it("should throw TypeError when status code is not 0", () => {
        // given
        const hubResponse = new TestHubResponse();
        hubResponse.status_code = 1;

        // when
        try {
            validateHubResponse(hubResponse);
            fail("No error thrown");
        } catch (e) {
            expect(e).toBeInstanceOf(TypeError);
            // @ts-expect-error We know e is a TypeError by this point in the test
            expect(<TypeError>e.message).toBe("Error response from Credential Management.");
        }
    });

    it("should throw TypeError when certificate is empty", () => {
        // given
        const hubResponse = new TestHubResponse();
        hubResponse.certificate = "";

        // when
        try {
            validateHubResponse(hubResponse);
            fail("No error thrown");
        } catch (e) {
            expect(e).toBeInstanceOf(TypeError);
            // @ts-expect-error We know e is a TypeError by this point in the test
            expect(<TypeError>e.message).toBe("Invalid response from Credential Management.");
        }
    });

    it("should throw TypeError when signatures is empty", () => {
        // given
        const hubResponse = new TestHubResponse();
        hubResponse.signatures = [];

        // when
        try {
            validateHubResponse(hubResponse);
            fail("No error thrown");
        } catch (e) {
            expect(e).toBeInstanceOf(TypeError);
            // @ts-expect-error We know e is a TypeError by this point in the test
            expect(<TypeError>e.message).toBe("Invalid response from Credential Management.");
        }
    });

});