import {Station} from "./model/station";
import {Point} from "./model/point";
import {BestStationFinder} from "./best-station/best-station-finder";
import {BasicBestStationFinder} from "./best-station/basic-best-station-finder";
import {LazyCachedBestStationFinder} from "./best-station/lazy-cached-best-station-finder";
import {DiligentCachedBestStationFinder} from "./best-station/diligent-cached-best-station-finder";

export class App {
    run() {
        console.log('Running basic best station finder');
        const basicFinder = new BasicBestStationFinder();
        this.runBestStation(basicFinder);

        console.log('Running lazy cached best station finder');
        const lazyFinder = new LazyCachedBestStationFinder();
        this.runBestStation(lazyFinder);

        console.log('Running diligent cached best station finder');
        const diligentFinder = new DiligentCachedBestStationFinder();
        this.runBestStation(diligentFinder);
    }

    private runBestStation(bestStationFinder: BestStationFinder) {
        this.initStations(bestStationFinder);
        const devices = this.initDevices();

        for (const device of devices) {
            const result = bestStationFinder.getBestStation(device);
            console.log(result.toString());
        }
        console.log('-----------------');
    }

    private initStations(bestStationFinder: BestStationFinder) {
        const station1 = new Station(new Point(0, 0), 10);
        bestStationFinder.addStation(station1);

        const station2 = new Station(new Point(20, 20), 5);
        bestStationFinder.addStation(station2);

        const station3 = new Station(new Point(10, 0), 12);
        bestStationFinder.addStation(station3);
    }

    private initDevices(): Array<Point> {
        const devices: Array<Point> = [];

        const device1 = new Point(0, 0);
        const device2 = new Point(100, 100);
        const device3 = new Point(15, 10);
        const device4 = new Point(18, 18);

        devices.push(device1);
        devices.push(device2);
        devices.push(device3);
        devices.push(device4);

        return devices;
    }
}
