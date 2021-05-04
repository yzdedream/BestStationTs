import {LazyCachedBestStationFinder} from "../best-station/lazy-cached-best-station-finder";
import {TestUtil} from "./test.util";
import {Point} from "../model/point";
import {Station} from "../model/station";

let lazy = new LazyCachedBestStationFinder();
let cache = lazy.getCache();
const stations = TestUtil.getTestStations();
const devices = TestUtil.getTestDevices();

beforeEach(() => {
    lazy = new LazyCachedBestStationFinder();
    cache = lazy.getCache();
    for (const station of stations) {
        lazy.addStation(station);
    }
});

test('test get best station', () => {
    expect(cache.size).toBe(0);

    const device1 = devices[0];
    const result = lazy.getBestStation(device1);
    expect(cache.size).toBe(1);
    expect(result.bestStation).toEqual(stations[0]);
    expect(result.bestPower).toBe(100);

    const device2 = devices[1];
    const result2 = lazy.getBestStation(device2);
    expect(cache.size).toBe(2);
    expect(result2.bestStation).toBe(undefined);
    expect(result2.bestPower).toBe(undefined);


    const device3 = devices[2];
    const result3 = lazy.getBestStation(device3);
    expect(cache.size).toBe(3);
    expect(result3.bestStation).toEqual(stations[2]);
    expect(result3.bestPower).toBe(0.6718427000252355);

    const device4 = devices[3];
    const result4 = lazy.getBestStation(device4);
    expect(cache.size).toBe(4);
    expect(result4.bestStation).toEqual(stations[1]);
    expect(result4.bestPower).toBe(4.715728752538098);

    lazy.getBestStation(device1);
    lazy.getBestStation(device2);
    lazy.getBestStation(device3);
    lazy.getBestStation(device4);
    expect(cache.size).toBe(4);
});


test('delete station', () => {
    expect(cache.size).toBe(0);

    const device1 = devices[0];
    const result = lazy.getBestStation(device1);
    expect(cache.size).toBe(1);

    const station = new Station(new Point(1, 1), 10);
    lazy.deleteStation(station);
    expect(cache.size).toBe(1);

    const station2 = new Station(new Point(0, 0), 10);
    lazy.deleteStation(station2);
    expect(cache.size).toBe(0);
})
