export function background(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const background = new Path2D();
    background.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#fff';
    ctx.fill(background);
}
