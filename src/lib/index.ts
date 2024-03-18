import { Circle } from "./Circle";
import { Scene } from "./Scene";
import { Between } from "./Between";
import { background } from "./utils/background";

export const scene: Scene = new Scene();

export function setup(ctx: CanvasRenderingContext2D) {
    console.log('setup');
    
    const circle_one = new Circle('one', ctx, 400, 400, 16, '#000');
    const circle_two = new Circle('two', ctx, 200, 200, 16, '#000');
    const circle_three = new Circle('three', ctx, 600, 600, 16, '#000');
    
    scene.add([circle_one, circle_two, circle_three]);

    /** move circle_one on the x-axis */
    new Between(400, 500, 2000, (value) => circle_one.x = value).start();
    /** move circle_two on __both__ axis */
    new Between(200, 400, 3000, (value) => {
        circle_two.y = value;
        circle_two.x = value;
    }).start();
    /** animate the radius of circle_three */
    new Between(16, 32, 1800, (value) => circle_three.radius = value).start();

    draw(ctx);
}

export function draw(ctx: CanvasRenderingContext2D) {
    background(ctx);
    
    scene.render();
    
    requestAnimationFrame(() => draw(ctx));
}
