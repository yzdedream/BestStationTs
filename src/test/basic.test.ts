import {BasicBestStationFinder} from "../best-station/basic-best-station-finder";
import {TestUtil} from "./test.util";
import {Point} from "../model/point";

test('basic best station finder', () => {
    const basic = new BasicBestStationFinder();

    const stations = TestUtil.getTestStations();
    for (const station of stations) {
        basic.addStation(station);
    }

    const device = new Point(0, 10);
    const result = basic.getBestStation(device);

    expect(result.bestStation).toEqual(stations[0]);
    expect(result.bestPower).toBe(0);

    const device2 = new Point(30, 30);
    const result2 = basic.getBestStation(device2);

    expect(result2.bestStation).toBe(undefined);
    expect(result2.bestPower).toBe(undefined);
});
