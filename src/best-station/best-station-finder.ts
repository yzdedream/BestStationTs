import {Station} from "../model/station";
import {Point} from "../model/point";
import {BestStationResult} from "../model/best-station-result";

export abstract class BestStationFinder {
    stations: Array<Station> = [];

    abstract addStation(station: Station): void;

    abstract deleteStation(station: Station): void;

    getBestStation(device: Point): BestStationResult {
        let bestStation: Station | null = null;
        let maxPower = 0;

        for (const station of this.stations) {
            if (!station.isInReach(device)) {
                continue;
            }

            const power = station.getPower(device);
            if (!bestStation) {
                bestStation = station;
                maxPower = power;
                continue;
            }

            if (power > maxPower) {
                bestStation = station;
                maxPower = power;
            }
        }
        return this.buildBestStationResult(device, bestStation, maxPower);
    }

    buildBestStationResult(device: Point, bestStation: null | Station, maxPower: number): BestStationResult {
        const bestStationResult = new BestStationResult(device);

        if (bestStation) {
            bestStationResult.bestStation = bestStation;
            bestStationResult.bestPower = maxPower;
        }
        return bestStationResult;
    }

    isStationExist(target: Station): boolean {
        return this.stations.some(station => station.equals(target));
    }

}
