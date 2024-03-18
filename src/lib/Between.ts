type OnTickFunc = (value: any) => void;

export class Between {
    _time: number | null;
    _start: number;
    _end: number;
    _duration: number;
    _onTick: OnTickFunc;

    constructor(start: number, end: number, duration: number, onTick: OnTickFunc) {
        this._time = null;
        this._start = start;
        this._end = end;
        this._duration = duration;
        this._onTick = onTick;
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
