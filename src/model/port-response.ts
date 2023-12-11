import {PortData} from "./port-data";

export class PortResponse {
    portData: PortData;

    constructor(portData: PortData) {
        this.portData = portData;
    }
}