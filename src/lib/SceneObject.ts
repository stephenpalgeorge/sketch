import { Vector } from "./Vector";

export abstract class SceneObject {
    private _id: string;
    private _pos: Vector;
    private _vel: Vector;
    private _limit: number | null;

    constructor(id: string, pos: Vector) {
        this._id = id;
        this._pos = pos;
        this._vel = new Vector(0, 0);
        this._limit = null;
    }

    /**
     * 
     * @see `Scene` constructor for dispatch of events
     * 
     * @param callback {EventListenerOrEventListenerObject} the callback to run on click
     */
    click(callback: EventListenerOrEventListenerObject): void {
        document.addEventListener(`click:${this.id}`, callback);
    }

    abstract draw(): void;
    abstract contains(vec: Vector): boolean;
    abstract apply(vec: Vector): void;
    abstract constrain(vec: Vector): Vector;

    get id(): string { return this._id; }
    set id(value: string) { this._id = value; }

    get pos(): Vector { return this._pos; }
    set pos(vector: Vector) { this._pos = vector; }

    get vel(): Vector { return this._vel; }
    set vel(value: Vector) { this._vel = value; }

    get limit(): number|null { return this._limit; }
    set limit(value: number) { this._limit = value; }
}
