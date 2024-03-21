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
  <div>
    <div>
      <label for="payload">Payload:</label>
    </div>
    <div>
      <input id="payload" v-model="state.payload" @change="payloadChange"/>
    </div>
  </div>

  <div>
    <div>
      <label for="json">JSON:</label>
    </div>
    <div>
      <textarea id="json" v-model="state.json" @change="jsonChange"/>
    </div>
  </div>

  <div>
    <div>
      <label for="base64Json">Base64 Encoded JSON:</label>
    </div>
    <div>
      <textarea id="base64Json" v-model="state.base64Json" @change="base64Change"/>
    </div>
  </div>

  <div>
    <button @click="signJson">Submit</button>
  </div>

  <code>{{ state.result }}</code>
  <div>{{ state.errorMessage }}</div>
</template>
