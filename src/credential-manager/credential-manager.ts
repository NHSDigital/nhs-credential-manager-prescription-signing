import {Connection, hubConnection, Proxy} from "signalr-no-jquery";
import {HubResponse} from "../model/hub-response";

export class CredentialManager {
    private _connection: Connection;
    private _signingHub: Proxy;

    private SIGNALR_HUB_NAME = "signingHub";
    private SIGNALR_METHOD_NAME = "requestToSign";

    constructor(host: string, port: number) {
        this._connection = hubConnection(`${host}:${port}`);
        this._signingHub = this._connection.createHubProxy(this.SIGNALR_HUB_NAME);
    }

    initialise() {
        return new Promise((res) =>
            this._connection.start({transport: "longPolling"}, () => res(null))
        );
    }

    async signJwt(jwt: string): Promise<HubResponse> {
        return await this._signingHub.invoke(this.SIGNALR_METHOD_NAME, jwt);
    }
}
