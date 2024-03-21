import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {Base64} from "js-base64";
import {HubResponse, signPrescription} from "nhs-credential-manager-prescription-signing";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, FormsModule],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css"
})
export class AppComponent {
    initialJson = {
        algorithm: "RS1",
        requestType: 1,
        version: 1,
        flags: 0,
        payloads: [
            {
                id: "123",
                payload: "Some Payload"
            }
        ]
    };

    payload: string = "";
    json: string = JSON.stringify(this.initialJson, null, "\t");
    base64Json: string = Base64.encode(this.json);
    result: string = "";
    errorMessage: string = "";

    payloadChange(value: string) {
        this.payload = value;
        let intermediateJson = this.initialJson;
        intermediateJson.payloads[0].payload = value;
        this.json = JSON.stringify(intermediateJson, null, "\t");
        this.base64Json = Base64.encode(JSON.stringify(intermediateJson));
    }

    jsonChange(value: string) {
        this.json = value;
        this.base64Json = Base64.encode(JSON.stringify(value, null, "\t"));
        this.payload = JSON.parse(value).payloads[0].payload;
    }

    base64Change(value: string) {
        this.base64Json = value;
        this.json = Base64.decode(value);
        this.payload = JSON.parse(Base64.decode(value)).payloads[0].payload;
    }

    signJson() {
        signPrescription(this.base64Json).then((result: HubResponse) => this.result = JSON.stringify(result, null, "\t")).catch(e => {
            console.error(e);
            this.errorMessage = e.message;
        });
    }
}
