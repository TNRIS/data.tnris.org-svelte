import { get, writable } from "svelte/store";

const mapStore = writable(null);
export const draw = writable(null);

function createMapPreviewsStore() {
  const { subscribe, set, update } = writable({
    sources: [],
    layers: [],
  });

  const addSource = (srcName, src) => {
    const map = get(mapStore);

    if (!map) {
      console.log("map not initialized, mapPreview src ${srcName} failed.");
      return;
    }
    if (map.getSource(srcName) != undefined) {
      try {
        map.removeLayer(srcName);
      } catch {
        console.error(`layer ${srcName} does not exist`);
      }
      map.removeLayer(srcName);
    }
    map.addSource(srcName, src);

    update((ml) => {
      return { ...ml, sources: [...ml.sources, src] };
    });
  };

  const addLayer = (layer) => {
    const map = get(mapStore);

    if (map.getLayer(layer.id) != undefined) {
      try {
        map.removeLayer(layer.id);
      } catch {
        console.error(`layer ${layer.id} does not exist`);
      }
      map.removeLayer(layer.id);
    }

    map.addLayer(layer)

    update((ml) => {
      return { ...ml, layers: [...ml.layers, layer] };
    });
  };

  return {
    subscribe,
    addSource: addSource,
    addLayer: addLayer,
    reset: () => set({ layers: [], sources: [] }),
  };
}

export default mapStore;
