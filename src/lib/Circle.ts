import { SceneObject } from "./SceneObject";

export class Circle extends SceneObject {
    ctx: CanvasRenderingContext2D;
    _x: number;
    _y: number;
    _radius: number;
    fill: string|null;
    stroke: string|null;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, fill: string | null = null, stroke: string | null = null) {
        super();

        this.ctx = ctx;
        this._x = x;
        this._y = y;
        this._radius = radius;
        this.fill = fill;
        this.stroke = stroke;
    }

    draw(): void {
        const shape = new Path2D();
        shape.arc(this._x, this._y, this._radius, 0, Math.PI * 2);

        if (this.fill) {
            this.ctx.fillStyle = this.fill;
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
}
