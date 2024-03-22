export class Vector {
    _x: number;
    _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    set x(value: number) { this._x = value; }
    get x(): number { return this._x; }

    set y(value: number) { this._y = value; }
    get y(): number { return this._y; }
}
