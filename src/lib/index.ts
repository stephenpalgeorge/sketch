import { Canvas } from "./Canvas";
import { Circle } from "./Circle";
import { Scene } from "./Scene";
import { Vector } from "./Vector";
import { Between, BetweenVectors } from "./Between";

let canvas: Canvas;
let scene: Scene;
let gravity: boolean = false;

export function setup() {
    console.log('setup');
    
    canvas = new Canvas('#sketch-canvas');
    if (!canvas.context) return;

    scene = new Scene(canvas.context);

    const circle_one = new Circle('one', canvas.context, 400, 400, 16, '#000', {color: '#888', thickness: 4});
    const circle_two = new Circle('two', canvas.context, 200, 200, 16, '#f88');
    const circle_three = new Circle('three', canvas.context, 600, 600, 16, '#8f8');
    
    scene.add([circle_one, circle_two, circle_three]);
    scene.addForce("gravity", new Vector(0, 2));

    /** move circle_one on the x-axis */
    const fly = new Between(400, 500, 2000, (value) => circle_one.x = value as number);
    /** move circle_two on __both__ axis, using vectors */
    new BetweenVectors(circle_two.pos, new Vector(400, 0), 3000, (value) => circle_two.pos = value as Vector).start();
    /** animate the radius of circle_three */
    const grow = new Between(16, 32, 1800, (value) => circle_three.radius = value as number);

    circle_one.click(() => fly.start());
    circle_three.click(() => grow.start());

    requestAnimationFrame(draw);
}

export function draw() {
    canvas.background('#fff');
    
    if (gravity) scene.apply('gravity');
    scene.render();
    
    requestAnimationFrame(draw);
}
