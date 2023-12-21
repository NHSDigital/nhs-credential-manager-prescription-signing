# NHS Credential Manager Prescription Signing (NCMPS)

![Build](https://github.com/NHSDigital/nhs-credential-manager-prescription-signing/actions/workflows/test-on-push.yml/badge.svg)
![Lint](https://github.com/NHSDigital/nhs-credential-manager-prescription-signing/actions/workflows/linting.yml/badge.svg)

This is a library to integrate with a locally
running [NHS Credential Management](https://digital.nhs.uk/services/care-identity-service/applications-and-services/technical-services/credential-management)
to sign prescriptions

## Installation

As NCMPS is hosted in NPM, a simple `npm install nhs-credential-manager-prescription-signing` will add this to your
project.
ADD TYPE STUFF HERE

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

A Next.js example project is available in `examples/react-example-webapp`. This provides a simple input field to paste a
JWT and a button to sign. Any errors will be shown should the process fail. Feel free to use this to verify your CMS &
Port Service installation. (Though the dev MSI of CMS will be required in order for it to allow connections from
localhost)

### Running

From within the `examples/react-example-webapp` directory run `npm install` followed by `npm run dev`

## Troubleshooting

### Common Errors

#### Error response from Credential Management.

Check console for details. 

Smartcard not inserted
```json 
{
  "certificate": "",
  "signatures": null,
  "failed_signatures": null,
  "status_code": 1397311237,
  "status_string": "ERROR",
  "message": "Unable to locate a Smartcard on the local system that contains an appropriate X.509 Digital Certificate that can be used to perform a signing operation. Error Code: (0x53494705) No X.509 Signing certificate found",
  "timestamp": "2023-12-19T09:08:37.6560010Z"
}
```
Invalid JSON Payload - Check it's definitely Base64 encoded.
```json
{
  "certificate": "",
  "signatures": null,
  "failed_signatures": null,
  "status_code": 1397311235,
  "status_string": "ERROR",
  "message": "Failed to process inbound JSON request. Check logs for futher information. Error Code: (0x53494703) An Internal error occurred",
  "timestamp": "2023-12-19T09:24:43.3156582Z"
}
```
#### PR30007: Request failed due to unknown exception. Exception=Unable to find CM process for user
Credential Manager is not running. Please ensure it is installed and started.

#### All promises were rejected
NHS Port Service is not running. This should be started with CM, so restart/reinstall CM to ensure this is running.

