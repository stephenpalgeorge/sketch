interface randomOptions {
    forceInt: boolean,
}

const defaultOptions: randomOptions = {
    forceInt: true,
}

export function random(min: number, max: number, options?: randomOptions): number {
    const opts: randomOptions = Object.assign(defaultOptions, options);

    if (opts.forceInt) return Math.floor(Math.random() * (max - min + 1)) + min;
    else return Math.random() * (max - min + 1) + min;
}
