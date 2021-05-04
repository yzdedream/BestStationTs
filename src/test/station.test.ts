import {Station} from "../model/station";
import {Point} from "../model/point";

test('test is in reach', () => {
    const station1 = new Station(new Point(0, 0), 10);

    const device1 = new Point(1, 1);
    expect(station1.isInReach(device1)).toBe(true);

    const device2 = new Point(10, 10);
    expect(station1.isInReach(device2)).toBe(false);

    const station2 = new Station(new Point(0, 0), 0);
    const device3 = new Point(0, 0);
    expect(station2.isInReach(device3)).toBe(false);
});


test('test get power', () => {
    const station1 = new Station(new Point(0, 0), 10);

    const device1 = new Point(0, 0);
    expect(station1.getPower(device1)).toBe(100);

    const device2 = new Point(10, 10);
    expect(station1.getPower(device2)).toBe(0);

    const station2 = new Station(new Point(0, 0), 0);
    const device3 = new Point(0, 0);
    expect(station2.getPower(device3)).toBe(0);
});
