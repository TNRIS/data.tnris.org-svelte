import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { nodeLoaderPlugin } from "@vavite/node-loader/plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(),
    nodeLoaderPlugin(),
  ],
  build: {
    sourcemap: true,
  }
  ,server:{
    port:3000,
    strictPort:false,
    },
})
