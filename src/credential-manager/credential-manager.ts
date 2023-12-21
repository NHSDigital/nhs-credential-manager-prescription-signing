import {Connection, hubConnection, Proxy} from "signalr-no-jquery";
import {HubResponse} from "../model/hub-response";
import {Base64} from "js-base64";

export class CredentialManager {
    private _connection: Connection;
    private _signingHub: Proxy;

    private SIGNALR_HUB_NAME = "signingHub";
    private SIGNALR_METHOD_NAME = "requestToSign";

    constructor(host: string, port: number) {
        this._connection = hubConnection(`${host}:${port}`, {logging: true});
        this._signingHub = this._connection.createHubProxy(this.SIGNALR_HUB_NAME);
    }

    initialise() {
        return new Promise((res) =>
            this._connection.start({transport: "longPolling", contentType: "application/jwt"}, () => res(null))
        );
    }

    async signJwt(jwt: string): Promise<HubResponse> {
        return await this._signingHub.invoke(this.SIGNALR_METHOD_NAME, Base64.encode(JSON.stringify({
            algorithm: "RS1",
            requestType: 1,
            version: 1,
            flags: 0,
            payloads: [
                {
                    id: "e7d65dfa-9547-46ef-8cdc-3a665af27f5d",
                    payload: jwt
                }
            ]
        })));
    }
}
