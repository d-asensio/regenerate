#!/usr/bin/env node

const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const processArgs = yargs(hideBin(process.argv))
  .option('watch', {
    alias: 'w',
    type: 'boolean',
    description: 'Run in watch mode'
  })
  .option('esm', {
    type: 'boolean',
    description: 'Build ESM'
  })
  .option('cjs', {
    type: 'boolean',
    description: 'Build CJS'
  })
  .parse()

const {
  watch = false,
  esm = false,
  cjs = false
} = processArgs || {}

const commonConfig = {
  entryPoints: [
    './src/index.js'
  ],
  watch,
  bundle: true,
  minify: true,
  sourcemap: true,
  plugins: [
    nodeExternalsPlugin()
  ]
}

const configESM = {
  ...commonConfig,
  format: 'esm',
  target: ['esnext'],
  outdir: 'build/esm'
}

const configCJS = {
  ...commonConfig,
  format: 'cjs',
  platform: 'node',
  target: ['node10.4'],
  outdir: 'build/cjs'
}

;(async () => {
  try {
    const builds = [
      esm && esbuild.build(configESM),
      cjs && esbuild.build(configCJS)
    ].filter(Boolean)

    await Promise.all(builds)

    if (watch) console.log('Watching...')
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
