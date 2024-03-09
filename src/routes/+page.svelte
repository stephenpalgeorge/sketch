<script lang="ts">
    import '../styles/index.scss';

    import { onMount } from 'svelte';
    import { setup } from '$lib';
    
    let canvas: HTMLCanvasElement;
    
    onMount(() => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
    
        setup(ctx);
    });
</script>

<main>
    <canvas bind:this={canvas} width="800" height="800">
        Canvas not supported
    </canvas>
</main>