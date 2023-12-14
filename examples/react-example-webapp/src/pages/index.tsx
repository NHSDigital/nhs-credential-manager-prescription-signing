import Head from "next/head";
import {Inter} from "next/font/google";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";
const SigningComponent = dynamic(() => import ("@/pages/signingComponent"), {ssr: false});

const inter = Inter({subsets: ["latin"]});

export default function Home() {

    return (
        <>
            <Head>
                <title>NCMPS React Example App</title>
                <meta name="description" content="NCMPS React Example App"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                <SigningComponent/>
            </main>
        </>
    );
}
