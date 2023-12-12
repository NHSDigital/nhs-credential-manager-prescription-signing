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

```typescript
import {signPrescription} from "nhs-credential-manager-prescription-signing";

async function doSigning() {
    // get your JWT
    let jwt = "some JWT";
    signPrescription(jwt)
        .then(response => {
            // do something with the response
        })
        .error(error => {
            // handle errors
        });
}
```
