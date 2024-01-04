import {PortData} from "./port-data";
import {FaultException} from "./fault-exception";

export class PortResponse {
    portData: PortData;
    faultException?: FaultException;

    constructor(portData: PortData, faultException?: FaultException) {
        this.portData = portData;
        this.faultException = faultException;
    }
}