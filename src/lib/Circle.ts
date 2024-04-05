import { SceneObject } from "./SceneObject";
import { Vector } from "./Vector";

interface StrokeOptions {
    color: string,
    thickness?: number,
}

export class Circle extends SceneObject {
    private _ctx: CanvasRenderingContext2D;
    private _radius: number;
    private _fill: string|null;
    private stroke: StrokeOptions|null;

    /**
     * 
     * @param id {string} a unique identifier for the Circle
     * @param ctx {CanvasRenderingContext2D} the context that the Circle should be drawn to
     * @param x {number} the x position of the Circle's center
     * @param y {number} the y position of the Circle's center
     * @param radius {number} the distance from the Circle's center to its circumference
     * @param fill {string|null} any valid CSS color for colouring in the Circle
     * @param stroke {StrokeOptions|null} any valid CSS color for the Circle's outline
     * 
     */
    constructor(id: string, ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, fill: string | null = null, stroke: StrokeOptions | null = null) {
        super(id, new Vector(x, y));

        this._ctx = ctx;
        this._radius = radius;
        this._fill = fill;
        this.stroke = stroke;
    }

    draw(): void {
        const shape = new Path2D();
        shape.arc(this.pos.x, this.pos.y, this._radius, 0, Math.PI * 2);
        
        if (this._fill) {
            this.ctx.fillStyle = this._fill;
            this.ctx.fill(shape);
        }
        
        if (this.stroke) {
            this.ctx.strokeStyle = this.stroke.color;
            if (this.stroke.thickness) this.ctx.lineWidth = this.stroke.thickness;
            this.ctx.stroke(shape);
        }
    }

    /**
     * 
     * Check if a given vector is contained within the bounds of the Circle
     * 
     * @param target {Vector}
     * @returns boolean
     */
    contains(target: Vector): boolean {
        return target.distance(this.pos) <= this.radius;
    }

    get ctx(): CanvasRenderingContext2D { return this._ctx; }
    set ctx(context: CanvasRenderingContext2D) { this._ctx = context; }

    get x(): number { return this.pos.x; }
    set x(value: number) { this.pos = new Vector(value, this.pos.y); }

    get y(): number { return this.pos.y; }
    set y(value: number) { this.pos = new Vector(this.pos.x, value); }

    get radius(): number { return this._radius; }
    set radius(r: number) { this._radius = r; }

    set fill(color: string) { this._fill = color; }
}
