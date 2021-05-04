import {TestUtil} from "./test.util";
import {DiligentCachedBestStationFinder} from "../best-station/diligent-cached-best-station-finder";
import {Station} from "../model/station";
import {Point} from "../model/point";

let diligent = new DiligentCachedBestStationFinder();
let cache = diligent.getCache();
const stations = TestUtil.getTestStations();
const devices = TestUtil.getTestDevices();

beforeEach(() => {
    diligent = new DiligentCachedBestStationFinder();
    cache = diligent.getCache();
    for (const station of stations) {
        diligent.addStation(station);
    }
});

test('get best station', () => {
    const totalCoverageSize = 21 * 21 + 11 * 11 + 25 * 25 - 13 * 21;
    expect(cache.size).toBe(totalCoverageSize);

    const device1 = devices[0];
    const result1 = diligent.getBestStation(device1);
    expect(cache.size).toBe(totalCoverageSize);
    expect(result1.bestStation).toEqual(stations[0]);
    expect(result1.bestPower).toBe(100);

    const device2 = devices[1];
    const result2 = diligent.getBestStation(device2);
    expect(cache.size).toBe(totalCoverageSize + 1);
    expect(result2.bestStation).toBe(undefined);
    expect(result2.bestPower).toBe(undefined);

    const device3 = devices[2];
    const result3 = diligent.getBestStation(device3);
    expect(cache.size).toBe(totalCoverageSize + 1);
    expect(result3.bestStation).toEqual(stations[2]);
    expect(result3.bestPower).toBe(0.6718427000252355);

    const device4 = devices[3];
    const result4 = diligent.getBestStation(device4);
    expect(cache.size).toBe(totalCoverageSize + 1);
    expect(result4.bestStation).toEqual(stations[1]);
    expect(result4.bestPower).toBe(4.715728752538098);

    diligent.getBestStation(device1);
    diligent.getBestStation(device2);
    diligent.getBestStation(device3);
    diligent.getBestStation(device4);
    expect(cache.size).toBe(totalCoverageSize + 1);
})

test('delete station', () => {
    const totalCoverageSize = 21 * 21 + 11 * 11 + 25 * 25 - 13 * 21;
    const device1 = devices[0];
    const result1 = diligent.getBestStation(device1);
    expect(cache.size).toBe(totalCoverageSize);

    const station = new Station(new Point(1, 1), 10);
    diligent.deleteStation(station);
    expect(cache.size).toBe(totalCoverageSize);

    const station2 = new Station(new Point(0, 0), 10);
    diligent.deleteStation(station2);
    const result2 = diligent.getBestStation(device1);
    expect(result2.bestStation).toEqual(stations[2]);
    expect(result2.bestPower).toBe(4);
})
