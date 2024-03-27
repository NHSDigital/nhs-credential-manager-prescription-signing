import {useState} from "react";
import {HubResponse, signPrescription} from "nhs-credential-manager-prescription-signing";
import {Base64} from "js-base64";

export default function SigningComponent() {

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

    const [payload, setPayload] = useState("");
    const [json, setJson] = useState(JSON.stringify(initialJson, null, "\t"));
    const [base64Json, setBase64Json] = useState(Base64.encode(JSON.stringify(initialJson)));
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    function signJson() {
        setResult("");
        setError("");
        signPrescription(base64Json).then((result: HubResponse) => setResult(JSON.stringify(result, null, "\t"))).catch(e => {
            console.error(e);
            setError(e.message);
        });
    }

    return <div className={"content"}>
        <div className={"nhsuk-form-group"}>
            <label className={"nhsuk-label"} htmlFor={"payload"}>Payload:</label>
            <input id={"payload"} className={"nhsuk-input"} value={payload} onChange={inputEvent => {
                setPayload(inputEvent.target.value);
                let intermediateJson = initialJson;
                intermediateJson.payloads[0].payload = inputEvent.target.value;
                setJson(JSON.stringify(intermediateJson, null, "\t"));
                setBase64Json(Base64.encode(JSON.stringify(intermediateJson)));
            }}/>
        </div>

        <div className={"nhsuk-form-group"}>
            <label className={"nhsuk-label"} htmlFor={"json"}>JSON:</label>
            <textarea id={"json"} className={"nhsuk-textarea"} rows={12} value={json} onChange={inputEvent => {
                setJson(inputEvent.target.value);
                setBase64Json(Base64.encode(JSON.stringify(inputEvent.target.value, null, "\t")));
                setPayload(JSON.parse(inputEvent.target.value).payloads[0].payload);
            }}/>
        </div>

        <div className={"nhsuk-form-group"}>
            <label className={"nhsuk-label"} htmlFor={"base64Json"}>Base64 Encoded JSON:</label>
            <textarea id={"base64Json"} className={"nhsuk-textarea"} value={base64Json} onChange={inputEvent => {
                setBase64Json(inputEvent.target.value);
                setJson(Base64.decode(inputEvent.target.value));
                setPayload(JSON.parse(Base64.decode(inputEvent.target.value)).payloads[0].payload);
            }}/>
        </div>
        <div>
            <button className={"nhsuk-button"} data-module={"nhsuk-button"} type={"submit"}
                    onClick={() => signJson()}>Submit
            </button>
        </div>

        {result.length > 0 && <div className={"nhsuk-warning-callout"}>
            <h3 className={"nhsuk-warning-callout__label"}>
                <span role={"text"}>
                    <span className={"nhsuk-u-visually-hidden"}>Important: </span>
                    Result
                </span>
            </h3>
            <pre>{result}</pre>
        </div>}
        {error.length > 0 && <div className={"nhsuk-warning-callout"}>
            <h3 className={"nhsuk-warning-callout__label"}>
                <span role={"text"}>
                    <span className={"nhsuk-u-visually-hidden"}>Important: </span>
                    Error
                </span>
            </h3>
            <p>{error}</p>
        </div>}
    </div>;
}