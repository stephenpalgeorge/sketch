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

    limit(value: number): Vector {
        const maximal: number = Math.max(Math.abs(this.x), Math.abs(this.y));
        if (maximal <= value) return new Vector(this.x, this.y);
        
        const scale: number = value / maximal;
        return new Vector(this.x * scale, this.y * scale);
    }

    /**
     * 
     * @param vector {Vector}
     */
    add(vector: Vector): void {
        this.x = this.x + vector.x;
        this.y = this.y + vector.y;
    }

    static add(origin: Vector, target: Vector): Vector {
        return new Vector(origin.x + target.x, origin.y + target.y);
    }

    subtract(vector: Vector): void {
        this.x = this.x - vector.x;
        this.y = this.y - vector.y;
    }

    static subtract(origin: Vector, target: Vector): Vector {
        return new Vector(origin.x - target.x, origin.y - target.y);
    }

    mult(target: Vector|number): Vector {
        let x, y;
        if (typeof target === 'number') {
            x = this.x * target;
            y = this.y * target;
        } else {
            x = this.x * target.x;
            y = this.y * target.y;
        }

        return new Vector(x, y);
    }

    static mult(origin: Vector, target: Vector|number): Vector {
        let x, y;
        if (typeof target === 'number') {
            x = origin.x + target;
            y = origin.y + target;
        } else {
            x = origin.x + target.x;
            y = origin.y + target.y;
        }

        return new Vector(x, y);
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
