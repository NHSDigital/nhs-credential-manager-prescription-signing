import {HubResponse} from "../../src/model/hub-response";
import {Signature} from "../../src/model/signature";
import {TestSignature} from "./test-signature";

export class TestHubResponse implements HubResponse {

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