import {useState} from "react";
import {signPrescription} from "../../../../dist/index";

export default function SigningComponent() {

    const [jwt, setJwt] = useState("");
    const [result, setResult] = useState("");

    function signJwt(jwt: string) {
        signPrescription(jwt).then(result => setResult(JSON.stringify(result))).catch(error => console.error(error));
    }

    return <>
        <input value={jwt} onChange={inputEvent => setJwt(inputEvent.target.value)}/>
        <button onClick={() => signJwt(jwt)}>Submit</button>
        <div>{result}</div>
    </>
}