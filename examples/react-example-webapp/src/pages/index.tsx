import Head from "next/head";
import {Inter} from "next/font/google";
import styles from "@/styles/Home.module.css";
import {useState} from "react";
import {signPrescription} from "../../../../dist";

const inter = Inter({subsets: ["latin"]});

export default function Home() {

    const [jwt, setJwt] = useState("");
    const [result, setResult] = useState("");

    function signJwt(jwt: string) {
        signPrescription(jwt).then(result => setResult(JSON.stringify(result))).catch(error => console.error(error));
    }

    return (
        <>
            <Head>
                <title>NCMPS React Example App</title>
                <meta name="description" content="NCMPS React Example App"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                <input value={jwt} onChange={inputEvent => setJwt(inputEvent.target.value)}/>
                <button onClick={() => signJwt(jwt)}>Submit</button>
                <div>{result}</div>
            </main>
        </>
    );
}
