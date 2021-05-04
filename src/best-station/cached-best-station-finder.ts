import {BestStationFinder} from "./best-station-finder";
import {BestStationResult} from "../model/best-station-result";
import {Point} from "../model/point";

export abstract class CachedBestStationFinder extends BestStationFinder {
    cache: Map<string, BestStationResult> = new Map<string, BestStationResult>();

    getBestStation(device: Point): BestStationResult {
        const cacheResult = this.cache.get(device.toString());
        if (!cacheResult) {
            const result = super.getBestStation(device);
            this.cache.set(device.toString(), result);
            return result;
        }
        return cacheResult;
    }

    getCache():Map<string, BestStationResult>{
        return this.cache;
    }
}
