import {PortRedirectionService} from "../../src/credential-manager/port-redirection-service";
import axios, {Axios} from "axios";
import MockAdapter from "axios-mock-adapter";
describe("Port Redirection Service tests", () => {
    const prs = new PortRedirectionService();
    const mockAxios = new MockAdapter(axios);

    test.each([
        {expectedPortNumber:43487, failurePorts: [44213, 45031, 46478, 48853]},
        {expectedPortNumber:44213, failurePorts: [43487, 45031, 46478, 48853]},
        {expectedPortNumber:45031, failurePorts: [43487, 44213, 46478, 48853]},
        {expectedPortNumber:46478, failurePorts: [43487, 44213, 45031, 48853]},
        {expectedPortNumber:48853, failurePorts: [43487, 44213, 45031, 46478]}
    ])("Should return the port that CMS is running on", async (input) => {
        // given
        mockAxios.onGet(`http://localhost:${input.expectedPortNumber}/PRS/GetPortNumber`).reply(200, {
            portData: {
                portNumber: input.expectedPortNumber
            }
        });

        input.failurePorts.forEach(port => {
            mockAxios.onGet(`http://localhost:${port}/PRS/GetPortNumber`).reply(404)
        });

        // when
        let response = await prs.locateService();

        // then
        expect(response.portData.portNumber).toBe(input.expectedPortNumber);
    });
});