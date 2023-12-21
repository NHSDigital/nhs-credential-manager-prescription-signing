import {useState} from "react";
import {signPrescription, HubResponse} from "../../../../dist/index";

export default function SigningComponent() {

    const [jwt, setJwt] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    function signJwt(jwt: string) {
        signPrescription(jwt).then((result: HubResponse) => setResult(JSON.stringify(result,null,'\t'))).catch(e => {
            console.error(e)
            setError(e.message)
        });
    }

    return <>
        <textarea value={jwt} onChange={inputEvent => setJwt(inputEvent.target.value)}/>
        <button onClick={() => signJwt(jwt)}>Submit</button>
        <pre style={{
            maxWidth: "80%",
            overflow: "scroll"
        }}>{result}</pre>
        <div>{error}</div>
    </>;
}