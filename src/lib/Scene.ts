import { SceneObject } from "./SceneObject";
import type { Vector } from './Vector';

type Force = { label: string, vector: Vector };

export class Scene {
    _actors: Array<SceneObject>;
    _forces: Array<Force>;

    constructor(actors: Array<SceneObject> = []) {
        this._actors = actors;
        this._forces = [];
    }

    add(actor: SceneObject|Array<SceneObject>): void {
        if (Array.isArray(actor)) actor.forEach(a => this._actors.push(a));
        else this._actors.push(actor);
    }

    get(id: string): SceneObject|undefined {
        return this._actors.find(actor => actor.id === id);
    }

    addForce(force: Force): void {
        this._forces.push(force);
    }

    force(label: string): Vector|undefined {
        return this._forces.find(force => force.label === label)?.vector;
    }

    apply(force: string): void {
        const targetForce: Force|undefined = this._forces.find(f => f.label === force);
        if (!targetForce) {
            console.error(`Force Undefined: no force has been added to the scene with label "${force}"`);
            return
        }

        this._actors.forEach(actor => actor.pos.add(targetForce.vector));
    }

    render() {
        this._actors.forEach(actor => actor.draw());
    }

    get actors(): Array<SceneObject> { return this.actors; }
    get forces(): Array<Force> { return this._forces; }
}