const browserSync = require('browser-sync').create()
const path = require('path')

const config = require('../../patternlab-config.json')
const patternlab = require('patternlab-node')(config)

const paths = () => config.paths
const getConfiguredCleanOption = () => config.cleanPublic

function resolvePath(pathInput) {
  return path.resolve(pathInput).replace(/\\/g, '/')
}

const build = (done) => {
  patternlab.build(done, getConfiguredCleanOption())
}

module.exports = {
  browserSync,
  resolvePath,
  patternlab,
  paths,
  getConfiguredCleanOption,
  build
}
