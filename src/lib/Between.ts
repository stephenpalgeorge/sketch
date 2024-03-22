import { Vector } from "./Vector";

type OnTickFunc = (value: number|Vector) => void;

abstract class TweenTemplate {
    _time: number | null;
    _duration: number;
    _onTick: OnTickFunc;

    constructor(duration: number, onTick: OnTickFunc) {
        this._time = null;
        this._duration = duration;
        this._onTick = onTick;
    }

    abstract animate(timestamp: number): void;
    abstract start(): void;
}

export class Between extends TweenTemplate {
    _start: number;
    _end: number;

    constructor(start: number, end: number, duration: number, onTick: OnTickFunc) {
        super(duration, onTick);
        this._time = null;
        this._start = start;
        this._end = end;
    }

    animate(timestamp: number): void {
        if (!this._time) this._time = timestamp;
        const progress: number = Math.min((timestamp - this._time) / this._duration, 1);
        const interpolatedValue: number = this._start + ((this._end - this._start) * progress);

        this._onTick(interpolatedValue);

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
    
    constructor(start: Vector, end: Vector, duration: number, onTick: OnTickFunc) {
        super(duration, onTick);
        this._start = start;
        this._end = end;
    }

    animate(timestamp: number): void {
        if (!this._time) this._time = timestamp;

        const progress: number = Math.min((timestamp - this._time) / this._duration, 1);
        const interpolated_x: number = this._start.x + ((this._end.x - this._start.x) * progress);
        const interpolated_y: number = this._start.y + ((this._end.y - this._start.y) * progress);

        this._onTick(new Vector(interpolated_x, interpolated_y));

        if (progress < 1) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    start(): void {
        requestAnimationFrame(this.animate.bind(this));
    }
}
