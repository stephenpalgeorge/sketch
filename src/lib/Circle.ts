import { SceneObject } from "./SceneObject";

export class Circle extends SceneObject {
    ctx: CanvasRenderingContext2D;
    _x: number;
    _y: number;
    _radius: number;
    _fill: string|null;
    stroke: string|null;

    constructor(id: string, ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, fill: string | null = null, stroke: string | null = null) {
        super(id);

        this.ctx = ctx;
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._fill = fill;
        this.stroke = stroke;
    }

    draw(): void {
        const shape = new Path2D();
        shape.arc(this._x, this._y, this._radius, 0, Math.PI * 2);
        
        if (this._fill) {
            this.ctx.fillStyle = this._fill;
            this.ctx.fill(shape);
        } else if (this.stroke) {
            this.ctx.strokeStyle = this.stroke;
            this.ctx.stroke(shape);
        }
    }

    set x(value: number) {
        this._x = value;
    }

    set y(value: number) {
        this._y = value;
    }

    set radius(r: number) {
        this._radius = r;
    }

    set fill(color: string) {
        this._fill = color;
    }
}
