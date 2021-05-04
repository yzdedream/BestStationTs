import {Station} from "../model/station";
import {Point} from "../model/point";

export class TestUtil {
    static getTestStations(): Array<Station> {
        const station1 = new Station(new Point(0, 0), 10);
        const station2 = new Station(new Point(20, 20), 5);
        const station3 = new Station(new Point(10, 0), 12);

        return [station1, station2, station3];
    }

    static getTestDevices(): Array<Point> {
        const device1 = new Point(0, 0);
        const device2 = new Point(100, 100);
        const device3 = new Point(15, 10);
        const device4 = new Point(18, 18);

        return [device1, device2, device3, device4];
    }
}
