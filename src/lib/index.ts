import { Circle } from "./Circle";
import { Scene } from "./Scene";
import { Vector } from "./Vector";
import { Between, BetweenVectors } from "./Between";
import { background } from "./utils/background";

let scene: Scene;
let gravity: boolean = false;

export function setup(ctx: CanvasRenderingContext2D) {
    console.log('setup');
    
    scene = new Scene(ctx);

    const circle_one = new Circle('one', ctx, 400, 400, 16, '#000');
    const circle_two = new Circle('two', ctx, 200, 200, 16, '#f88');
    const circle_three = new Circle('three', ctx, 600, 600, 16, '#8f8');
    
    scene.add([circle_one, circle_two, circle_three]);
    scene.addForce("gravity", new Vector(0, 2));

    /** move circle_one on the x-axis */
    new Between(400, 500, 2000, (value) => circle_one.x = value as number);
    /** move circle_two on __both__ axis, using vectors */
    new BetweenVectors(circle_two.pos, new Vector(400, 0), 3000, (value) => circle_two.pos = value as Vector);
    /** animate the radius of circle_three */
    new Between(16, 32, 1800, (value) => circle_three.radius = value as number);

    scene.on('click', (event) => {
        const mouse = scene.mouse(event as MouseEvent);
        console.log(mouse.distance(circle_one.pos), circle_one.radius);
        if (mouse.distance(circle_one.pos) < circle_one.radius) console.log(mouse);
    });

    draw(ctx);
}

export function draw(ctx: CanvasRenderingContext2D) {
    background(ctx);
    
    if (gravity) scene.apply('gravity');
    scene.render();
    
    requestAnimationFrame(() => draw(ctx));
}
