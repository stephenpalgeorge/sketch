import { SceneObject } from "./SceneObject";

export class Scene {
    actors: Array<SceneObject>;

    constructor(actors: Array<SceneObject> = []) {
        this.actors = actors;
    }

    add(actor: SceneObject|Array<SceneObject>): void {
        if (Array.isArray(actor)) actor.forEach(a => this.actors.push(a));
        else this.actors.push(actor);
    }

    render() {
        this.actors.forEach(actor => actor.draw());
    }

    get(id: string): SceneObject|undefined {
        return this.actors.find(actor => actor.id === id);
    }
}