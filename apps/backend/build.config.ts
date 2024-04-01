import { defineBuildConfig } from 'unbuild'
import sharedConfig from './shared.config'

export default defineBuildConfig({
  entries: [
    // normal bundles
    'src/index',

    // file-to-file (please use .mts for all of your files), currently mkdist uncontrollably generates .d.ts and .d.mts based on the original extension: .ts or .mts
    // {
    //   builder: 'mkdist',
    //   input: './src/',
    //   esbuild: { minify: true },
    // },
  ],
  declaration: 'node16',
  clean: true,
  rollup: {
    esbuild: {
      minify: true,
    },
  },
  ...sharedConfig,
})
