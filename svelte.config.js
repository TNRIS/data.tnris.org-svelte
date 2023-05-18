import sveltePreprocess from "svelte-preprocess";

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess({
    sourceMap: true,
    scss: {
      prependData: `@import './src/styles/variables.scss';`,
    },
  }),
  compilerOptions: {
    enableSourcemap: true,
  },
};
