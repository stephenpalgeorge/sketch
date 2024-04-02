import { SceneObject } from "./SceneObject";
import { Vector } from "./Vector";

export class Circle extends SceneObject {
    private _ctx: CanvasRenderingContext2D;
    private _radius: number;
    private _fill: string|null;
    private stroke: string|null;

    constructor(id: string, ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, fill: string | null = null, stroke: string | null = null) {
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
        } else if (this.stroke) {
            this.ctx.strokeStyle = this.stroke;
            this.ctx.stroke(shape);
        }
    }

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
