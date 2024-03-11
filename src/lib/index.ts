import { Circle } from "./Circle";
import { background } from "./utils/background";

export const scene: Array<Circle> = [];

export function setup(ctx: CanvasRenderingContext2D) {
    console.log('setup');
    
    const circle_one = new Circle(ctx, 400, 400, 16, '#000');
    scene.push(circle_one);

    const circle_two = new Circle(ctx, 200, 200, 16, '#000');
    scene.push(circle_two);

    const circle_three = new Circle(ctx, 600, 600, 16, '#000');
    scene.push(circle_three);

    draw(ctx);
}

export function draw(ctx: CanvasRenderingContext2D) {
    background(ctx);
    
    scene.forEach((item, index) => {
        if (index === 0) item.x = item._x + 0.5;

        item.draw();
    });
    
    requestAnimationFrame(() => draw(ctx));
}
