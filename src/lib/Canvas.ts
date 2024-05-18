export class Canvas {
    private _selector: string;
    private _element: HTMLCanvasElement | null;
    private _context: CanvasRenderingContext2D | null;

    /**
     * 
     * @param selector {string} Any valid CSS selector that targets an HTMLCanvasElement
     */
    constructor(selector: string) {
        this._selector = selector;

        const target: HTMLElement | null = document.querySelector(this._selector);
        if (target && /canvas/i.test(target.nodeName)) {
            this._element = target as HTMLCanvasElement;
            this._context = this._element.getContext('2d');
        } else {
            this._element = null;
            this._context = null;
            console.warn('you passed a selector that does not target a Canvas element');
        }
    }

    /**
     * 
     * Clear the canvas and make it blank/empty again
     */
    clear(): void {
        if (this.element && this.context) this.context.clearRect(0, 0, this.element.width, this.element.height);
    }

    /**
     * 
     * Clear the canvas and then draw a background color to its
     * 
     * @param color {string} Any valid CSS color value
     */
    background(color: string): void {
        this.clear();

        if (this.context) {
            const background = new Path2D();
            background.rect(0, 0, this.context.canvas.width, this.context.canvas.height);
            this.context.fillStyle = color;
            this.context.fill(background);
        }
    }

    get element(): HTMLCanvasElement | null { return this._element; }
    set element(canvas: HTMLCanvasElement | null) { this._element = canvas; }

    get context(): CanvasRenderingContext2D | null { return this._context; }

    get width(): number { return this.element?.width || 0; }

    get height(): number { return this.element?.height || 0; }
}
