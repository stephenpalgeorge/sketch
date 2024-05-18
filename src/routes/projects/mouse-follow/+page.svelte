<script lang="ts">
    import { onMount } from "svelte";
    import { Canvas, Circle, Scene } from "$lib";

    let canvas: Canvas;
    let scene: Scene;

    function setup(): void {
        canvas = new Canvas('#random-walker-canvas');
        if (!canvas.context) return;

        scene = new Scene(canvas.element);

        const mover = new Circle('first-walker', canvas.context, 400, 400, 16, '#000000');
        scene.add(mover);

        requestAnimationFrame(draw);
    }

    function draw(): void {
        canvas.background('#fff');
        scene.render();
        requestAnimationFrame(draw);
    }

    onMount(() => setup());
</script>

<canvas id="random-walker-canvas" width="800" height="800">
    Canvas not supported
</canvas>
