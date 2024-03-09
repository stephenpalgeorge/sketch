import { SceneObject } from "./SceneObject";

export class Circle extends SceneObject {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    radius: number;
    fill: string|null;
    stroke: string|null;
    shape: Path2D;

    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, fill: string | null = null, stroke: string | null = null) {
        super();

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.fill = fill;
        this.stroke = stroke;
        this.shape = new Path2D();
    }

    draw(): void {
        this.shape.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        if (this.fill) {
            this.ctx.fillStyle = this.fill;
            this.ctx.fill(this.shape);
        } else if (this.stroke) {
            this.ctx.strokeStyle = this.stroke;
            this.ctx.stroke(this.shape);
        }
    }
}
