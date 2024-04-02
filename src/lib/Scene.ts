import { SceneObject } from "./SceneObject";
import { Vector } from './Vector';

interface SceneOptions {
    clickEvents: boolean,
}

const defaultOptions: SceneOptions = {
    clickEvents: true,
}

export class Scene {
    private _ctx: CanvasRenderingContext2D;
    private _actors: Array<SceneObject>;
    private _forces: Map<string, Vector>;
    options: SceneOptions;

    constructor(ctx: CanvasRenderingContext2D, options?: SceneOptions) {
        this._ctx = ctx;
        this._actors = [];
        this._forces = new Map();
        this.options = Object.assign(defaultOptions, options);

        if (this.options.clickEvents) {
            this.ctx.canvas.addEventListener('click', (event) => {
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
        if (Array.isArray(actor)) actor.forEach(a => this._actors.push(a));
        else this._actors.push(actor);
    }

    get(id: string): SceneObject|undefined {
        return this._actors.find(actor => actor.id === id);
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

        this._actors.forEach(actor => actor.pos.add(targetForce));
    }

    render(): void {
        this._actors.forEach(actor => actor.draw());
    }

    on(event: string, callback: EventListenerOrEventListenerObject): void {
        this._ctx.canvas.addEventListener(event, callback);
    }

    remove(event: string, callback: EventListenerOrEventListenerObject): void {
        this._ctx.canvas.removeEventListener(event, callback);
    }

    mouse(event: MouseEvent): Vector {
        return new Vector(event.clientX - this._ctx.canvas.offsetLeft, event.clientY - this._ctx.canvas.offsetTop);
    }

    get actors(): Array<SceneObject> { return this._actors; }
    get forces(): Map<string, Vector> { return this._forces; }
    get ctx(): CanvasRenderingContext2D { return this._ctx; }
}