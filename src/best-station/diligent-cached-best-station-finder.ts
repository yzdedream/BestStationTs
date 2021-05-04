import {CachedBestStationFinder} from "./cached-best-station-finder";
import {Station} from "../model/station";
import {Point} from "../model/point";

export class DiligentCachedBestStationFinder extends CachedBestStationFinder {
    // granularity of coverage matrix
    step = 1;

    addStation(station: Station): void {
        if (!this.isStationExist(station)) {
            this.stations.push(station);
            this.updateCacheOnStationChange(station);
        }
    }

    deleteStation(station: Station): void {
        if (this.isStationExist(station)) {
            this.stations = this.stations.filter(s => !s.equals(station));
            this.updateCacheOnStationChange(station);
        }
    }

    private updateCacheOnStationChange(station: Station) {
        const coverage = this.getCoverage(station);
        this.updateCacheByCoverage(coverage);
    }

    private updateCacheByCoverage(coverage: Array<Point>) {
        for (const point of coverage) {
            this.cache.delete(point.toString());
            this.cache.set(point.toString(), super.getBestStation(point));
        }
    }

    private getCoverage(station: Station): Array<Point> {
        const center = station.position;
        const topLeft = new Point(center.x - station.reach, center.y + station.reach);
        const bottomRight = new Point(center.x + station.reach, center.y - station.reach);
        return this.generateMatrix(topLeft, bottomRight);
    }

    private generateMatrix(topLeft: Point, bottomRight: Point): Array<Point> {
        const matrix: Array<Point> = [];
        const step = this.step;
        for (let x = topLeft.x; x <= bottomRight.x; x += step) {
            for (let y = topLeft.y; y >= bottomRight.y; y -= step) {
                matrix.push(new Point(x, y));
            }
        }
        return matrix;
    }
}
