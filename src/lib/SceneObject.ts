import type { Vector } from "./Vector";

export abstract class SceneObject {
    private _id: string;
    private _pos: Vector;

    constructor(id: string, pos: Vector) {
        this._id = id;
        this._pos = pos;

    }

    click(callback: EventListenerOrEventListenerObject): void {
        document.addEventListener(`click:${this.id}`, callback);
    }

    abstract draw(): void;
    abstract contains(vec: Vector): boolean;

    get id(): string { return this._id; }
    set id(value: string) { this._id = value; }

    get pos(): Vector { return this._pos; }
    set pos(vector: Vector) { this._pos = vector; }
}
