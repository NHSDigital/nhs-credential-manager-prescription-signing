import {validateHubResponse} from "./validation/response-validator";
import {PortRedirectionService} from "./credential-manager/port-redirection-service";
import {CredentialManager} from "./credential-manager/credential-manager";
import {HubResponse} from "./model/hub-response";


export async function signPrescription(jwt: string): Promise<HubResponse> {
    let rsp = await new PortRedirectionService().locateService();

    let credentialsManager = new CredentialManager(
        'http://localhost',
        rsp.portData.portNumber
    );
    await credentialsManager.initialise();

    const hubResponse = await credentialsManager.signJwt(jwt);
    validateHubResponse(hubResponse);

    return hubResponse;
}