import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: "build",
    assetsDir: "static"
  },
  //  ,server:{
  //    port:3000,
  //    strictPort:false,
  //    },
});
