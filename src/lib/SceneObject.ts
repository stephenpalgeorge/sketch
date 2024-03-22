import type { Vector } from "./Vector";

export abstract class SceneObject {
    id: string;
    _pos: Vector;

    constructor(id: string, pos: Vector) {
        this.id = id;
        this._pos = pos;

    }

    abstract draw(): void;

    get pos(): Vector { return this._pos; }
}
