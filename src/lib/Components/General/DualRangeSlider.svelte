<script lang="ts">
  export let start = 1930;
  export let end = 2030;
  export let range = [1930, 2030];

  export let onDatesChangedCallback = function (start: 1, end: 2) {
    return null;
  };

  let body;
  let slider;

  function draggable(node) {
    let x;
    let y;
    function handleMousedown(event) {
      if (event.type === "touchstart") {
        event = event.touches[0];
      }
      x = event.clientX;
      y = event.clientY;
      node.dispatchEvent(
        new CustomEvent("dragstart", {
          detail: { x, y },
        })
      );
      window.addEventListener("mousemove", handleMousemove);
      window.addEventListener("mouseup", handleMouseup);
      window.addEventListener("touchmove", handleMousemove);
      window.addEventListener("touchend", handleMouseup);
    }
    function handleMousemove(event) {
      if (event.type === "touchmove") {
        event = event.changedTouches[0];
      }
      const dx = event.clientX - x;
      const dy = event.clientY - y;
      x = event.clientX;
      y = event.clientY;
      node.dispatchEvent(
        new CustomEvent("dragmove", {
          detail: { x, y, dx, dy },
        })
      );
    }
    function handleMouseup(event) {
      x = event.clientX;
      y = event.clientY;
      node.dispatchEvent(
        new CustomEvent("dragend", {
          detail: { x, y },
        })
      );
      onDatesChangedCallback(start, end);
      window.removeEventListener("mousemove", handleMousemove);
      window.removeEventListener("mouseup", handleMouseup);
      window.removeEventListener("touchmove", handleMousemove);
      window.removeEventListener("touchend", handleMouseup);
    }
    node.addEventListener("mousedown", handleMousedown);
    node.addEventListener("touchstart", handleMousedown);
    return {
      destroy() {
        node.removeEventListener("mousedown", handleMousedown);
        node.removeEventListener("touchstart", handleMousedown);
      },
    };
  }
  function inRange(x) {
    if (x >= range[0] && x <= range[1]) return x;
    if (x < range[0]) return range[0];
    if (x > range[1]) return range[1];
  }
  function setHandlePosition(which) {
    return function (evt) {
      const { left, right } = slider.getBoundingClientRect();
      const parentWidth = right - left;
      const x = evt.detail.x;
      const relX = x - left;
      const percent = relX / parentWidth;
      const value = (range[1] - range[0]) * percent + range[0];

      if (which == "start") {
        if (Math.floor(inRange(value)) <= end - 1)
          start = Math.floor(inRange(value));
        return start;
      } else {
        if (Math.floor(inRange(value)) >= start + 1)
          end = Math.floor(inRange(value));
        return end;
      }
    };
  }
</script>

<div class="double-range-container">
  <div class="slider" bind:this={slider}>
    <div
      class="body"
      bind:this={body}
      use:draggable
      style="
				left: {Math.floor(((start - range[0]) / (range[1] - range[0])) * 100)}%;
				right: {-Math.floor(((end - range[1]) / (range[1] - range[0])) * 100)}%;
			"
    />
    <div
      class="handle"
      data-which="start"
      use:draggable
      on:dragmove|preventDefault|stopPropagation={setHandlePosition("start")}
      style="
				left: {Math.floor(((start - range[0]) / (range[1] - range[0])) * 100)}%
			"
    />
    <div
      class="handle"
      data-which="end"
      use:draggable
      on:dragmove|preventDefault|stopPropagation={setHandlePosition("end")}
      style="
				left: {Math.floor(((end - range[0]) / (range[1] - range[0])) * 100)}%
			"
    />
  </div>
</div>

<style>
  .double-range-container {
    width: 90%;
    height: 20px;
    user-select: none;
    box-sizing: border-box;
    white-space: nowrap;
    padding: 1rem;
  }
  .slider {
    position: relative;
    width: 100%;
    height: 6px;
    transform: translate(0, -50%);
    background-color: #e2e2e2;
    box-shadow: inset 0 7px 10px -5px #4a4a4a, inset 0 -1px 0px 0px #9c9c9c;
    border-radius: 1px;
  }
  .handle {
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
  }
  .handle:after {
    content: " ";
    box-sizing: border-box;
    position: absolute;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    background-color: #fdfdfd;
    border: 1px solid #7b7b7b;
    transform: translate(-50%, -50%);
  }
  /* .handle[data-which="end"]:after{
		transform: translate(-100%, -50%);
	} */
  .handle:active:after {
    background-color: #ddd;
    z-index: 9;
  }
  .body {
    top: 0;
    position: absolute;
    background-color: #34a1ff;
    bottom: 0;
  }
</style>
