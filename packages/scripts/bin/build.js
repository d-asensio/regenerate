#!/usr/bin/env node

const esbuild = require('esbuild')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const processArgs = yargs(hideBin(process.argv))
  .option('watch', {
    alias: 'w',
    type: 'boolean',
    description: 'Run in watch mode'
  })
  .parse()

const { watch = false } = processArgs || {}

const commonConfig = {
  entryPoints: [
    './src/index.js'
  ],
  watch,
  bundle: true,
  minify: true,
  sourcemap: true
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
    await Promise.all([
      esbuild.build(configESM),
      esbuild.build(configCJS)
    ])

    if (watch) console.log('Watching...')
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
