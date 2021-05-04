import {BestStationFinder} from "./best-station-finder";
import {Station} from "../model/station";

export class BasicBestStationFinder extends BestStationFinder {
    addStation(station: Station) {
        if (!this.isStationExist(station)) {
            this.stations.push(station);
        }
    }

    deleteStation(station: Station) {
        if (this.isStationExist(station)) {
            this.stations = this.stations.filter(s => !s.equals(station));
        }
    }
}
