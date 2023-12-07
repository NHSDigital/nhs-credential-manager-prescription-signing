import {validateHubResponse} from "./validation/response-validator";
import {locateService} from "./credential-manager/port-redirection-service";
import {CredentialManager} from "./credential-manager/credential-manager";
import {HubResponse} from "./model/hub-response";


export async function signPrescription(jwt: string): Promise<HubResponse> {
    let rsp = await locateService();

    let credentialsManager = new CredentialManager(
        'http://localhost',
        rsp.portData.portNumber
    );
    await credentialsManager.initialise();

    const hubResponse = await credentialsManager.signJwt(jwt);
    validateHubResponse(hubResponse);

    return hubResponse;
}