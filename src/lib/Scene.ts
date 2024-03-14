import { SceneObject } from "./SceneObject";

export class Scene {
    actors: Array<SceneObject>;

    constructor(actors: Array<SceneObject> = []) {
        this.actors = actors;
    }

    add(actor: SceneObject): void {
        this.actors.push(actor);
    }

    render() {
        this.actors.forEach(actor => actor.draw());
    }

    get(id: string): SceneObject|undefined {
        return this.actors.find(actor => actor.id === id);
    }
}