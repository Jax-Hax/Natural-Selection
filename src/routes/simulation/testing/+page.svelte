<script>
    import { sizeX, sizeY, generations, amMice, amSnakes, amCats } from '$lib/stores.js';
    import { onMount } from 'svelte';
    let p;
    onMount(() => {
        p.innerHTML = $sizeY;
    });
</script>
<p bind:this={p}>test</p>