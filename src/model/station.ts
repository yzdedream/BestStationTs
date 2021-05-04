import {Point} from "./point";

export class Station {
    position: Point;
    reach: number;

    constructor(position: Point, reach: number) {
        this.position = position;
        this.reach = reach;
    }

    isInReach(device: Point): boolean {
        const distance = this.position.getDistance(device);
        if (this.reach === 0) {
            return false
        }
        return distance <= this.reach;
    }

    getPower(device: Point) {
        if (this.isInReach(device)) {
            return Math.pow(this.reach - this.position.getDistance(device), 2);
        } else {
            return 0;
        }
    }

    equals(station2: Station): boolean {
        if (this == station2) {
            return true;
        }
        if (!station2) {
            return false;
        }
        return this.reach === station2.reach
            && this.position.equals(station2.position);
    }
}
