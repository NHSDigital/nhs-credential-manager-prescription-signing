import {validateHubResponse} from "../../src/validation/response-validator";
import {HubResponse} from "../../src/model/hub-response";
import {Signature} from "../../src/model/signature";

class TestSignature implements Signature {
    id: string;
    signature: string;

    constructor() {
        this.id = "id"
        this.signature = "signature"
    }
}

class TestHubResponse implements HubResponse {

    certificate: string;
    failed_signatures: Array<Signature>;
    message: string;
    signatures: Array<Signature>;
    status_code: number;
    status_string: string;
    timestamp: string;

    constructor() {
        this.certificate = "certificate";
        this.failed_signatures = [];
        this.message = "message";
        this.signatures = [new TestSignature()];
        this.status_code = 0;
        this.status_string = "status_string";
        this.timestamp = "timestamp";
    }
}

describe('Response Validator tests', () => {

    it("should throw TypeError when status code is not 0", () => {
        // given
        const hubResponse = new TestHubResponse();
        hubResponse.status_code = 1;

        // when
        try {
            validateHubResponse(hubResponse);
            fail("No error thrown");
        } catch (e: any) {
            expect(e).toBeInstanceOf(TypeError);
            expect(<TypeError>e.message).toBe("Error response from Credential Management.")
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
        } catch (e: any) {
            expect(e).toBeInstanceOf(TypeError);
            expect(<TypeError>e.message).toBe("Invalid response from Credential Management.")
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
        } catch (e: any) {
            expect(e).toBeInstanceOf(TypeError);
            expect(<TypeError>e.message).toBe("Invalid response from Credential Management.")
        }
    });

});