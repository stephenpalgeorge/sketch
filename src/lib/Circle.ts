import { SceneObject } from "./SceneObject";
import { Vector } from "./Vector";

export class Circle extends SceneObject {
    ctx: CanvasRenderingContext2D;
    _pos: Vector;
    _radius: number;
    _fill: string|null;
    stroke: string|null;

    constructor(id: string, ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, fill: string | null = null, stroke: string | null = null) {
        super(id);

        this.ctx = ctx;
        this._pos = new Vector(x, y);
        this._radius = radius;
        this._fill = fill;
        this.stroke = stroke;
    }

    draw(): void {
        const shape = new Path2D();
        shape.arc(this._pos.x, this._pos.y, this._radius, 0, Math.PI * 2);
        
        if (this._fill) {
            this.ctx.fillStyle = this._fill;
            this.ctx.fill(shape);
        } else if (this.stroke) {
            this.ctx.strokeStyle = this.stroke;
            this.ctx.stroke(shape);
        }
    }

    set x(value: number) { this._pos = new Vector(value, this._pos.y); }
    get x(): number { return this._pos.x; }

    set y(value: number) { this._pos = new Vector(this._pos.x, value); }
    get y(): number { return this._pos.y; }

    set pos(value: Vector) { this._pos = value; }
    get pos(): Vector { return this._pos; }

    set radius(r: number) {
        this._radius = r;
    }

    set fill(color: string) {
        this._fill = color;
    }
}
