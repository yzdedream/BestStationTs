export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getDistance(point2: Point): number {
        return Math.sqrt(
            Math.pow(point2.x - this.x, 2)
            + Math.pow(point2.y - this.y, 2)
        );
    }

    equals(point2: Point): boolean {
        if (this == point2) {
            return true;
        }
        if (!point2) {
            return false;
        }
        return this.x === point2.x
            && this.y === point2.y;
    }

    toString() {
        return "" + this.x + ", " + this.y;
    }
}
