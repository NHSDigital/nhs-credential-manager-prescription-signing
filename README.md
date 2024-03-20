# NHS Credential Manager Prescription Signing (NCMPS)

![Build](https://github.com/NHSDigital/nhs-credential-manager-prescription-signing/actions/workflows/test-on-push.yml/badge.svg)
![Lint](https://github.com/NHSDigital/nhs-credential-manager-prescription-signing/actions/workflows/linting.yml/badge.svg)
![Secrets Scan](https://github.com/NHSDigital/nhs-credential-manager-prescription-signing/actions/workflows/scan-secrets-on-push.yml/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=NHSDigital_nhs-credential-manager-prescription-signing&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=NHSDigital_nhs-credential-manager-prescription-signing)

This is a library to integrate with a locally
running [NHS Credential Management](https://digital.nhs.uk/services/care-identity-service/applications-and-services/technical-services/credential-management)
to sign prescriptions

## Installation

As NCMPS is hosted in NPM, a simple `npm install nhs-credential-manager-prescription-signing` will add this to your
project.
Alternatively checkout this repo and run `npm run build` and copy the generated `dist` directory into your project.

## Usage

All interactions come through the `signPrescription` method. Simply pass in your input JSON Base64 encoded.

```typescript
import {signPrescription} from "nhs-credential-manager-prescription-signing";
import {Base64} from "js-base64";

function doSigning() {
    // get your JSON
    let json = {
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
    signPrescription(Base64.encode(JSON.stringify(json)))
        .then((response: HubResponse) => {
            // do something with the response
        })
        .error(error => {
            // handle errors
        });
}
```

or alternatively

```typescript
import {signPrescription, HubResponse} from "nhs-credential-manager-prescription-signing";

async function doSigning() {
    // get your JSON
    let json = {
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
    let response: HubResponse = await signPrescription(Base64.encode(JSON.stringify(json)));
}
```

The response will be in the below format:

```json
{
  "certificate": "certificate",
  "failed_signatures": [],
  "message": "message",
  "signatures": [
    {
      "id": "id",
      "signature": "signature"
    }
  ],
  "status_code": 0,
  "status_string": "status_string",
  "timestamp": "timestamp"
}
```

## Examples

A variety of example projects are available in the `examples` directory. These provide a simple input field to paste
either a payload, unecoded json or encoded json and a button to sign. Any errors will be shown should the process fail.
Feel free to use these to verify your CMS & Port Service installation. (Though the dev MSI of CMS will be required in
order for it to allow connections from localhost)

### Running

#### NextJs/React

From within the `examples/react-example-webapp` directory run `npm install` followed by `npm run dev`

#### Vue

From within the `examples/vue-js-example` directory run `npm install` followed by `npm run dev`

## Troubleshooting

| Error in console                                                                                                                                                                                                                                                                              | Meaning                                                                                                                                                   |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Error response from Credential Management.`                                                                                                                                                                                                                                                  | Communication with Credential Management has failed. This will be accompanied by the error from CM for debugging purposes.                                |
| `Unable to locate a Smartcard on the local system that contains an appropriate X.509 Digital Certificate that can be used to perform a signing operation. Error Code: (0x53494705) No X.509 Signing certificate found`                                                                        | No smartcard inserted.                                                                                                                                    |
| `Failed to process inbound JSON request. Check logs for futher information. Error Code: (0x53494703) An Internal error occurred`                                                                                                                                                              | Invalid JSON Payload - Check it's definitely Base64 encoded.                                                                                              |
| `PR30007: Request failed due to unknown exception. Exception=Unable to find CM process for user`                                                                                                                                                                                              | Credential Manager is not running. Please ensure it is installed and started.                                                                             |
| `All promises were rejected`                                                                                                                                                                                                                                                                  | NHS Port Service is not running. This should be started with CM, so restart/reinstall CM to ensure this is running.                                       |
| `Access to XMLHttpRequest at 'http://localhost:43487/PRS/ConnectPRService' from origin 'https://your-url.com' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource` | Your application is not on the production Credential Management allowlist. Either switch to the development version or request your application is added. |

Please also check the Credential
Management [documentation](https://digital.nhs.uk/services/care-identity-service/applications-and-services/technical-services/credential-management)
if you are still having issues connecting.

## Git Secrets Scanning

This repo is scanned for secrets once a day on github.

* Exclusions are contained in the file .gitallowed and includes false positives and well known details like public DNS
  servers
* To run your own secret scan before you commit simply run ```docker build -f ./git-secrets/Dockerfile .``` in the root
  of this repo
* It is planned to enforce secret scanning with rollback on push to GitHub in the future