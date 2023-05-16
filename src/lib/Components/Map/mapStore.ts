import type { Map } from "maplibre-gl";
import { get, writable } from "svelte/store";
import type { Writable } from "svelte/store";
const mapStore: Writable<Map> = writable(null);
export const draw = writable(null);


export default mapStore;
