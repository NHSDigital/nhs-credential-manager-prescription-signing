import {validateHubResponse} from "./validation/response-validator";
import {PortRedirectionService} from "./credential-manager/port-redirection-service";
import {CredentialManager} from "./credential-manager/credential-manager";
import {HubResponse} from "./model/hub-response";


export async function signPrescription(jwt: string): Promise<HubResponse> {
    const rsp = await new PortRedirectionService().locateService();

    const credentialsManager = new CredentialManager(
        "http://localhost",
        rsp.portData.portNumber
    );
    await credentialsManager.initialise();

    const hubResponse = await credentialsManager.signJwt(jwt);
    validateHubResponse(hubResponse);

    return hubResponse;
}