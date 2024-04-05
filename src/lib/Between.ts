import { Vector } from "./Vector";

type OnTickFunc = (value: number|Vector) => void;

abstract class TweenTemplate {
    private _time: number | null;
    private _duration: number;
    private _onTick: OnTickFunc;

    constructor(duration: number, onTick: OnTickFunc) {
        this._time = null;
        this._duration = duration;
        this._onTick = onTick;
    }

    abstract animate(timestamp: number): void;
    abstract start(): void;

    get duration(): number { return this._duration; }
    set duration(value: number) { this._duration = value; }

    get onTick(): OnTickFunc { return this._onTick; }
    set onTick(callback: OnTickFunc) { this._onTick = callback; }

    get time(): number|null { return this._time; }
    set time(value: number|null) { this._time = value; }
}

export class Between extends TweenTemplate {
    _start: number;
    _end: number;

    /**
     * 
     * @param start {number} the initial/minimum value
     * @param end {number} the target/final/maximum value
     * @param duration {number} the number of milliseconds the tween should last for
     * @param onTick {OnTickFunc} the callback function that runs on every frame of animation
     */
    constructor(start: number, end: number, duration: number, onTick: OnTickFunc) {
        super(duration, onTick);
        this.time = null;
        this._start = start;
        this._end = end;
    }

    /**
     * 
     * @param timestamp stores the 'start' time of the tween, so we can calculate how long it's been going for
     */
    animate(timestamp: number): void {
        if (!this.time) this.time = timestamp;
        const progress: number = Math.min((timestamp - this.time) / this.duration, 1);
        const interpolatedValue: number = this._start + ((this._end - this._start) * progress);

        this.onTick(interpolatedValue);

        if (progress < 1) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    start(): void {
        requestAnimationFrame(this.animate.bind(this));
    }
}

export class BetweenVectors extends TweenTemplate {
    _start: Vector;
    _end: Vector;
    
    /**
     * 
     * @param start {number} the initial/minimum value
     * @param end {number} the target/final/maximum value
     * @param duration {number} the number of milliseconds the tween should last for
     * @param onTick {OnTickFunc} the callback function that runs on every frame of animation
     */
    constructor(start: Vector, end: Vector, duration: number, onTick: OnTickFunc) {
        super(duration, onTick);
        this._start = start;
        this._end = end;
    }

    /**
     * 
     * @param timestamp stores the 'start' time of the tween, so we can calculate how long it's been going for
     */
    animate(timestamp: number): void {
        if (!this.time) this.time = timestamp;

        const progress: number = Math.min((timestamp - this.time) / this.duration, 1);
        /**
         * 
         * compared to the `animate` function in the `Between` class above, as we are tweening between two vectors,
         * we now need to calculate two interpolated values, one for `x` and one for `y`
         */
        const interpolated_x: number = this._start.x + ((this._end.x - this._start.x) * progress);
        const interpolated_y: number = this._start.y + ((this._end.y - this._start.y) * progress);

        this.onTick(new Vector(interpolated_x, interpolated_y));

        if (progress < 1) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    start(): void {
        requestAnimationFrame(this.animate.bind(this));
    }
}
