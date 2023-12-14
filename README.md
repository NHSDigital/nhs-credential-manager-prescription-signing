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

All interactions come through the `signPrescription` method. Simply pass in your JSON Web Token (JWT).

```typescript
import {signPrescription} from "nhs-credential-manager-prescription-signing";

function doSigning() {
    // get your JWT
    let jwt = "some JWT";
    signPrescription(jwt)
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
    // get your JWT
    let jwt = "some JWT";
    let response: HubResponse = await signPrescription(jwt);
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
![Build](https://github.com/NHSDigital/nhs-credential-manager-prescription-signing/actions/workflows/test-example-on-push.yml/badge.svg)
![Lint](https://github.com/NHSDigital/nhs-credential-manager-prescription-signing/actions/workflows/linting-example.yml/badge.svg)

A Next.js example project is available in `examples/react-example-webapp`. This provides a simple input field to paste a
JWT and a button to sign. Any errors will be shown should the process fail. Feel free to use this to verify your CMS &
Port Service installation. (Though the dev MSI of CMS will be required in order for it to allow connections from
localhost)

### Running
From within the `examples/react-example-webapp` directory run `npm install` followed by `npm run dev`