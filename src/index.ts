import {validateHubResponse} from "./validation/response-validator";
import {PortRedirectionService} from "./credential-manager/port-redirection-service";
import {CredentialManager} from "./credential-manager/credential-manager";
import {HubResponse} from "./model/hub-response";
import {Signature} from "./model/signature";

async function signPrescription(json: string): Promise<HubResponse> {
    const rsp = await new PortRedirectionService().locateService();
    if (rsp.faultException !== undefined && rsp.faultException !== null) {
        console.error(rsp);
        throw new TypeError(`${rsp.faultException.code}: ${rsp.faultException.message}`);
    }

    const credentialManager = new CredentialManager(
        "http://localhost",
        rsp.portData.portNumber
    );
    await credentialManager.initialise();

    const hubResponse = await credentialManager.signJson(json);
    validateHubResponse(hubResponse);

    return hubResponse;
}

export {
    signPrescription,
    HubResponse,
    Signature
};