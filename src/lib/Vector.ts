export class Vector {
    private _x: number;
    private _y: number;

    /**
     * 
     * @param x {number} the vector's position on the x-axis
     * @param y {number} the vector's position on the y-axis
     */
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    /**
     * 
     * @param vector {Vector}
     */
    add(vector: Vector): void {
        this._x = this._x + vector.x;
        this._y = this._y + vector.y;
    }

    /**
     * 
     * Calculate the distance between this vector and another
     * 
     * @param target {Vector}
     * @returns {number}
     */
    distance(target: Vector): number {
        const dx: number = this._x - target.x;
        const dy: number = this._y - target.y;
        return Math.sqrt((dx * dx) + (dy * dy));
    }

    /**
     * 
     * Calculate the distance between any two vectors
     * 
     * @param origin {Vector}
     * @param target {Vector}
     * @returns number
     */
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
