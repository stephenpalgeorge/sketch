<script lang="ts">
    import { onMount } from "svelte";
    import { Canvas, Circle, Scene, Vector } from "$lib";
    import { random } from "$lib/utils/random";

    let canvas: Canvas;
    let scene: Scene;

    const RADIUS: number = 4;

    const directions: Array<Vector> = [
        new Vector(0, -RADIUS),
        new Vector(RADIUS, 0),
        new Vector(0, RADIUS),
        new Vector(-RADIUS, 0),
    ];

    function setup(): void {
        canvas = new Canvas('#random-walker-canvas');
        if (!canvas.context) return;

        scene = new Scene(canvas.element);

        const first = new Circle('first-walker', canvas.context, random(0, 800), random(0, 800), RADIUS, '#00000011');
        const second = new Circle('second-walker', canvas.context, random(0, 800), random(0, 800), RADIUS, '#00000011');
        scene.add([first, second]);

        requestAnimationFrame(draw);
    }

    function draw(): void {
        scene.render();

        const first_dir: number = random(0, directions.length - 1);
        const second_dir: number = random(0, directions.length - 1);

        const first = scene.get('first-walker');
        const second = scene.get('second-walker');
        if (first) first.pos.add(directions[first_dir]);
        if (second) second.pos.add(directions[second_dir]);

        requestAnimationFrame(draw);
    }

    onMount(() => setup());
</script>

<canvas id="random-walker-canvas" width="800" height="800">
    Canvas not supported
</canvas>
