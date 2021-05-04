import {Point} from "./point";
import {Station} from "./station";

export class BestStationResult {
    public device: Point;
    public bestStation?: Station;
    public bestPower?: number;

    constructor(device: Point) {
        this.device = device;
    }

    toString(): string {
        const emptyResult = `No link station within reach for point ${this.device.toString()}`;

        if (this.bestStation
            && this.bestPower) {
            return `Best link station for point ${this.device.toString()} is ${this.bestStation.position.toString()} with power ${this.bestPower}`;
        } else {
            return emptyResult;
        }

    }
}
