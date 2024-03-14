import { Circle } from "./Circle";
import { Scene } from "./Scene";
import { background } from "./utils/background";

export const scene: Scene = new Scene();

export function setup(ctx: CanvasRenderingContext2D) {
    console.log('setup');
    
    const circle_one = new Circle('one', ctx, 400, 400, 16, '#000');
    scene.add(circle_one);

    const circle_two = new Circle('two', ctx, 200, 200, 16, '#000');
    scene.add(circle_two);

    const circle_three = new Circle('three', ctx, 600, 600, 16, '#000');
    scene.add(circle_three);

    draw(ctx);
}

export function draw(ctx: CanvasRenderingContext2D) {
    background(ctx);
    
    scene.render();
    
    // requestAnimationFrame(() => draw(ctx));
}
