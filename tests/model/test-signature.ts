import {Signature} from "../../src/model/signature";

export class TestSignature implements Signature {
    id: string;
    signature: string;

    constructor() {
        this.id = "id";
        this.signature = "signature";
    }
}