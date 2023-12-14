import {PortResponse} from "../model/port-response";
import axios, {AxiosResponse} from "axios";

export class PortRedirectionService {

    async locateService(): Promise<PortResponse> {
        const portNumbers = [43487, 44213, 45031, 46478, 48853];
        const tasks = portNumbers.map((pn) =>
            axios.get<PortResponse>(`http://localhost:${pn}/PRS/GetPortNumber`, { withCredentials: true }).then((rsp: AxiosResponse) => rsp.data)
        );
        return Promise.any(tasks);
    }
}
