<script setup>
import {reactive} from "vue";
import {Base64} from "js-base64";
import {signPrescription} from "nhs-credential-manager-prescription-signing";

const initialJson = {
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
const state = reactive({
  payload: "",
  json: JSON.stringify(initialJson, null, "\t"),
  base64Json: Base64.encode(JSON.stringify(initialJson)),
  result: "",
  errorMessage: ""
});

function payloadChange(event) {
  state.payload = event.target.value;
  let intermediateJson = initialJson;
  intermediateJson.payloads[0].payload = event.target.value;
  state.json = JSON.stringify(intermediateJson, null, "\t");
  state.base64Json = Base64.encode(JSON.stringify(intermediateJson));
}

function jsonChange(event) {
  state.json = event.target.value;
  state.base64Json = Base64.encode(JSON.stringify(event.target.value, null, "\t"));
  state.payload = JSON.parse(event.target.value).payloads[0].payload;
}

function base64Change(event) {
  state.base64Json = event.target.value;
  state.json = Base64.decode(event.target.value);
  state.payload = JSON.parse(Base64.decode(event.target.value)).payloads[0].payload;
}

function signJson() {
  state.result = '';
  state.errorMessage = '';
  signPrescription(state.base64Json).then((result) => state.result = JSON.stringify(result, null, "\t")).catch(e => {
    console.error(e);
    state.errorMessage = e.message;
  });
}
</script>

<template>
      <div class="nhsuk-form-group">
        <label class="nhsuk-label" for="payload">Payload:</label>
        <input id="payload" class="nhsuk-input" v-model="state.payload" @change="payloadChange"/>
      </div>

      <div class="nhsuk-form-group">
        <label class="nhsuk-label" for="json">
          JSON:
        </label>
        <textarea class="nhsuk-textarea" id="json" name="example" rows="12" aria-describedby="example-hint"
                  v-model="state.json" @change="jsonChange"></textarea>
      </div>

      <div class="nhsuk-form-group">
        <label class="nhsuk-label" for="base64Json">
          Base64 Encoded JSON:
        </label>
        <textarea class="nhsuk-textarea" id="base64Json" name="example" rows="5" aria-describedby="example-hint"
                  v-model="state.base64Json" @change="base64Change"></textarea>
      </div>

      <div>
        <button class="nhsuk-button" data-module="nhsuk-button" type="submit" @click="signJson">Submit</button>
      </div>

      <div class="nhsuk-warning-callout" v-if="state.result.length > 0">
        <h3 class="nhsuk-warning-callout__label">
                <span role="text">
                  <span class="nhsuk-u-visually-hidden">Important: </span>
                  Result
                </span>
        </h3>
        <pre>{{ state.result }}</pre>
      </div>
      <div class="nhsuk-warning-callout" v-if="state.errorMessage.length > 0">
        <h3 class="nhsuk-warning-callout__label">
                <span role="text">
                  <span class="nhsuk-u-visually-hidden">Important: </span>
                  Error
                </span>
        </h3>
        <p>{{ state.errorMessage }}</p>
      </div>
</template>
