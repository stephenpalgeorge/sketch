import { Circle } from "./Circle";
import { background } from "./utils/background";

export const scene: Array<Circle> = [];

export function setup(ctx: CanvasRenderingContext2D) {
    const circle = new Circle(ctx, 400, 400, 16, '#000');
    scene.push(circle);

    requestAnimationFrame(() => draw(ctx));
}

export function draw(ctx: CanvasRenderingContext2D) {
    background(ctx);
    scene.forEach(item => item.draw());

    requestAnimationFrame(() => draw(ctx));
}
