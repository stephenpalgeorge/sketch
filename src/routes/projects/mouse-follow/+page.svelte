<script lang="ts">
    import { onMount } from "svelte";
    import { Canvas, Circle, Scene, Vector } from "$lib";

    let canvas: Canvas;
    let scene: Scene;

    let mouse: Vector | null = null;

    function setup(): void {
        canvas = new Canvas('#random-walker-canvas');
        if (!canvas.context) return;

        scene = new Scene(canvas.element);
        const mover = new Circle('mover', canvas.context, 400, 400, 16, '#000000');
        mover.limit = 5;
        scene.add(mover);

        canvas.element?.addEventListener('mousemove', (e: MouseEvent) => {
            mouse = scene.mouse(e);
        });

        requestAnimationFrame(draw);
    }

    function draw(): void {
        canvas.background('#fff');
        
        const mover = scene.get('mover');
        const difference = Vector.subtract(new Vector(mouse?.x || 0, mouse?.y || 0), mover?.pos || new Vector(0, 0)).limit(1);
        console.log(difference);
        if (mouse) mover?.vel.add(Vector.subtract(new Vector(mouse.x, mouse.y), mover.pos).limit(1));
        scene.render();
        requestAnimationFrame(draw);
    }

    onMount(() => setup());
</script>

<canvas id="random-walker-canvas" width="800" height="800">
    Canvas not supported
</canvas>
