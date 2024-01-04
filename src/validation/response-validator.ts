import {HubResponse} from "../model/hub-response";

export function validateHubResponse(hubResponse: HubResponse) {
    if (hubResponse.status_code !== 0) {
        console.log(`Got error response from Credential Management: ${JSON.stringify(hubResponse)}`);
        throw new TypeError("Error response from Credential Management.");
    }

    if (!hubResponse.certificate || !hubResponse.signatures.length) {
        console.log(`Got invalid response from Credential Management: ${JSON.stringify(hubResponse)}`);
        throw new TypeError("Invalid response from Credential Management.");
    }
}
