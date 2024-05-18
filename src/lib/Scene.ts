import { SceneObject } from "./SceneObject";
import { Vector } from './Vector';

interface SceneOptions {
    clickEvents?: boolean,
    wrap?: boolean,
}

const defaultOptions: SceneOptions = {
    clickEvents: true,
    wrap: true,
}

export class Scene {
    private _canvas: HTMLCanvasElement | null;
    private _ctx: CanvasRenderingContext2D | null;
    private _actors: Array<SceneObject>;
    private _forces: Map<string, Vector>;
    options: SceneOptions;

    constructor(canvas: HTMLCanvasElement | null, options?: SceneOptions) {
        this._canvas = canvas;
        this._ctx = canvas?.getContext('2d') || null;
        this._actors = [];
        this._forces = new Map();
        this.options = Object.assign(defaultOptions, options);

        if (this.options.clickEvents) {
            this.ctx?.canvas.addEventListener('click', (event) => {
                this.actors.forEach(actor => {
                    const mouse = this.mouse(event);
                    if (actor.contains(mouse)) {
                        document.dispatchEvent(new Event(`click:${actor.id}`));
                    }
                });
            });
        }
    }

    add(actor: SceneObject|Array<SceneObject>): void {
        if (Array.isArray(actor)) actor.forEach(a => this.actors.push(a));
        else this.actors.push(actor);
    }

    get(id: string): SceneObject|undefined {
        return this.actors.find(actor => actor.id === id);
    }

    addForce(label: string, vector: Vector): void {
        if (!this.forces.get(label)) this._forces.set(label, vector);
    }

    force(label: string): Vector|undefined {
        return this.forces.get(label);
    }

    apply(force: string): void {
        const targetForce: Vector|undefined = this.forces.get(force);
        if (!targetForce) {
            console.error(`Force Undefined: no force has been added to the scene with label "${force}"`);
            return
        }

        this.actors.forEach(actor => actor.pos.add(targetForce));
    }

    render(): void {
        this.actors.forEach(actor => {
            /**
             * if scene "wrapping" is turned on (which it is by default), we need to check
             * each "actor's" position to make sure it is within the bounds of the canvas, and 
             * adjust accordingly if it isn't
             */
            if (this.options.wrap && this.canvas !== null) {
                const { width, height } = this.canvas;

                if (actor.pos.x < 0) actor.pos = new Vector(width, actor.pos.y);
                if (actor.pos.x > width) actor.pos = new Vector(0, actor.pos.y);

                if (actor.pos.y < 0) actor.pos = new Vector(actor.pos.x, height);
                if (actor.pos.y > height) actor.pos = new Vector(actor.pos.x, 0);
            }

            actor.draw();
        });
    }

    on(event: string, callback: EventListenerOrEventListenerObject): void {
        this._ctx?.canvas.addEventListener(event, callback);
    }

    remove(event: string, callback: EventListenerOrEventListenerObject): void {
        this._ctx?.canvas.removeEventListener(event, callback);
    }

    mouse(event: MouseEvent): Vector {
        if (this.ctx) return new Vector(event.clientX - this.ctx.canvas.offsetLeft, event.clientY - this.ctx.canvas.offsetTop);
        else return new Vector(0, 0);
    }

    get actors(): Array<SceneObject> { return this._actors; }
    get forces(): Map<string, Vector> { return this._forces; }
    get canvas(): HTMLCanvasElement | null { return this._canvas; }
    get ctx(): CanvasRenderingContext2D | null { return this._ctx; }
}