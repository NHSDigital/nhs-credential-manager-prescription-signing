import {PortResponse} from "../model/port-response";

export class PortRedirectionService {

    async locateService(): Promise<PortResponse> {
        const portNumbers = [43487, 44213, 45031, 46478, 48853];
        const tasks = portNumbers.map((pn) =>
            fetch(`http://localhost:${pn}/PRS/GetPortNumber`, {
                method: 'GET',
                cache: 'no-cache',
                credentials: 'include',
            }).then((rsp) => rsp.json())
        );
        return Promise.any(tasks);
    }
}
