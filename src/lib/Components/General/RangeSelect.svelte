<script>
    export let min = 0;
    export let max = 0;
    export let step = 1;
    export let sliderOnly = false;


    let rangeSelection = []

</script>

<div>
    <input type="range" min={min} max={max} step={step} value="50">
</div>