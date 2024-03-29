import {useState} from "react";
import {signPrescription, HubResponse} from "../../../../dist/index";
import {Base64} from "js-base64";

export default function SigningComponent() {

    const initialJson  = {
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

    const [payload, setPayload] = useState("");
    const [json, setJson] = useState("");
    const [base64Json, setBase64Json] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    function signJson() {
        signPrescription(base64Json).then((result: HubResponse) => setResult(JSON.stringify(result,null,'\t'))).catch(e => {
            console.error(e)
            setError(e.message)
        });
    }

    return <>
        <label htmlFor={"payload"}>Payload:</label>
        <input name={"payload"} value={payload} onChange={inputEvent => {
            setPayload(inputEvent.target.value);
            let intermediateJson = initialJson;
            intermediateJson.payloads[0].payload = inputEvent.target.value;
            setJson(JSON.stringify(intermediateJson, null, '\t'));
            setBase64Json(Base64.encode(JSON.stringify(intermediateJson)));
        }}/>
        <label htmlFor={"json"}>JSON:</label>
        <textarea name={"json"} value={json} onChange={inputEvent => {
            setJson(inputEvent.target.value);
            setBase64Json(Base64.encode(JSON.stringify(inputEvent.target.value, null, '\t')));
            setPayload(JSON.parse(inputEvent.target.value).payloads[0].payload);
        }}/>
        <label htmlFor={"base64Json"}>Base64 Encoded JSON:</label>
        <textarea name={"base64Json"} value={base64Json} onChange={inputEvent => {
            setBase64Json(inputEvent.target.value);
            setJson(Base64.decode(inputEvent.target.value));
            setPayload(JSON.parse(Base64.decode(inputEvent.target.value)).payloads[0].payload);
        }}/>
        <button onClick={() => signJson()}>Submit</button>
        <pre style={{
            maxWidth: "80%",
            overflow: "scroll"
        }}>{result}</pre>
        <div>{error}</div>
    </>;
}