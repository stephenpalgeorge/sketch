<script lang="ts">
    import '../styles/index.scss';

    import { onMount } from 'svelte';
    import { setup } from '$lib';
    
    let canvas: HTMLCanvasElement;
    
    onMount(() => {
        setup();
    });
</script>

<main>
    <canvas id="sketch-canvas" bind:this={canvas} width="800" height="800">
        Canvas not supported
    </canvas>
</main>