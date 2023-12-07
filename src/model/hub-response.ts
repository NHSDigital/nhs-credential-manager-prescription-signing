import {Signature} from "./signature";

export interface HubResponse {
    certificate: string,
    status_code: number,
    status_string: string,
    message: string,
    timestamp: string,
    signatures: Array<Signature>,
    failed_signatures: Array<Signature>
}