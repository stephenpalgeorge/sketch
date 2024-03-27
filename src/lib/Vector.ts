export class Vector {
    _x: number;
    _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    add(vector: Vector): void {
        this._x = this._x + vector.x;
        this._y = this._y + vector.y;
    }

    distance(target: Vector): number {
        const dx: number = this._x - target.x;
        const dy: number = this._y - target.y;
        return Math.sqrt((dx * dx) + (dy * dy));
    }

    static distance(origin: Vector, target: Vector): number {
        const dx: number = origin.x - target.x;
        const dy: number = origin.y - target.y;
        return Math.sqrt((dx * dx) + (dy * dy));
    }

    set x(value: number) { this._x = value; }
    get x(): number { return this._x; }

    set y(value: number) { this._y = value; }
    get y(): number { return this._y; }
}
