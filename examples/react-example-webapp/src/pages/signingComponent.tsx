import {useState} from "react";
import {signPrescription, HubResponse} from "../../../../dist/index";

export default function SigningComponent() {

    const [json, setJson] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    function signJson() {
        signPrescription(json).then((result: HubResponse) => setResult(JSON.stringify(result,null,'\t'))).catch(e => {
            console.error(e)
            setError(e.message)
        });
    }

    return <>
        <textarea value={json} onChange={inputEvent => setJson(inputEvent.target.value)}/>
        <button onClick={() => signJson()}>Submit</button>
        <pre style={{
            maxWidth: "80%",
            overflow: "scroll"
        }}>{result}</pre>
        <div>{error}</div>
    </>;
}