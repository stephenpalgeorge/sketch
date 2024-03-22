import { Circle } from "./Circle";
import { Scene } from "./Scene";
import { Vector } from "./Vector";
import { Between, BetweenVectors } from "./Between";
import { background } from "./utils/background";

export const scene: Scene = new Scene();

export function setup(ctx: CanvasRenderingContext2D) {
    console.log('setup');
    
    const circle_one = new Circle('one', ctx, 400, 400, 16, '#000');
    const circle_two = new Circle('two', ctx, 200, 200, 16, '#000');
    const circle_three = new Circle('three', ctx, 600, 600, 16, '#000');
    
    scene.add([circle_one, circle_two, circle_three]);
    scene.addForce({label: "gravity", vector: new Vector(0, 2)});

    /** move circle_one on the x-axis */
    new Between(400, 500, 2000, (value) => circle_one.x = value as number).start();
    /** move circle_two on __both__ axis, using vectors */
    new BetweenVectors(circle_two.pos, new Vector(400, 0), 3000, (value) => circle_two.pos = value as Vector).start();
    /** animate the radius of circle_three */
    new Between(16, 32, 1800, (value) => circle_three.radius = value as number  ).start();

    draw(ctx);
}

export function draw(ctx: CanvasRenderingContext2D) {
    background(ctx);
    
    // (scene.get('two') as Circle)?.pos.add(scene.force('gravity')!);
    scene.apply('gravity');
    scene.render();
    
    requestAnimationFrame(() => draw(ctx));
}
