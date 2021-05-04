import {CachedBestStationFinder} from "./cached-best-station-finder";
import {Station} from "../model/station";

export class LazyCachedBestStationFinder extends CachedBestStationFinder {
    addStation(station: Station): void {
        if (!this.isStationExist(station)) {
            this.stations.push(station);
            this.cache.clear();
        }
    }

    deleteStation(station: Station): void {
        if (this.isStationExist(station)) {
            this.stations = this.stations.filter(s => !s.equals(station));
            this.cache.clear();
        }
    }
}
