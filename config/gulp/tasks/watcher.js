const {
  resolvePath,
  paths,
  browserSync,
  build
} = require('../setup')

const engines = require('../../../node_modules/patternlab-node/core/lib/pattern_engines')


function reload() {
  browserSync.reload()
}

function reloadCSS() {
  browserSync.reload('*.css')
}

function reloadJS() {
  browserSync.reload('*.js')
}

function getSupportedTemplateExtensions() {
  return engines.getSupportedFileExtensions()
}
function getTemplateWatches() {
  return getSupportedTemplateExtensions().map(dotExtension => `${resolvePath(paths().source.patterns)}/**/*${dotExtension}`)
}

module.exports = gulp => () => {
  /* eslint global-require: 0 */
  const taskCss = require('./css')(gulp)
  const taskJs = require('./js')(gulp)
  const taskSass = require('./sass')(gulp)
  const taskJpg = require('./jpg')(gulp)
  const taskPng = require('./png')(gulp)
  const taskSvg = require('./svg')(gulp)
  const taskStyleguide = require('./styleguide')(gulp)
  const taskStyleguideCss = require('./styleguide-css')(gulp)

  gulp.watch(`${resolvePath(paths().source.js)}/**/*.js`, { awaitWriteFinish: true }).on('change', gulp.series(taskJs, reloadJS))
  gulp.watch(`${resolvePath(paths().source.universal)}/**/*.js`, { awaitWriteFinish: true }).on('change', gulp.series(taskJs, reloadJS))
  gulp.watch(`${resolvePath(paths().source.patterns)}/**/*.js`, { awaitWriteFinish: true }).on('change', gulp.series(taskJs, reloadJS))
  gulp.watch(`${resolvePath(paths().source.locales)}/**/*.json`, { awaitWriteFinish: true }).on('change', gulp.series(taskJs, reloadJS))
  gulp.watch(`${resolvePath(paths().source.patterns)}/**/*.mustache`, { awaitWriteFinish: true }).on('change', gulp.series(taskJs, reloadJS))
  gulp.watch(`${resolvePath(paths().source.css)}/**/*.scss`, { awaitWriteFinish: true }).on('change', gulp.series(taskSass, reloadCSS))
  gulp.watch(`${resolvePath(paths().source.patterns)}/**/*.scss`, { awaitWriteFinish: true }).on('change', gulp.series(taskSass, reloadCSS))
  gulp.watch(`${resolvePath(paths().source.images)}/**/*.jpg`, { awaitWriteFinish: true }).on('change', gulp.series(taskJpg, reload))
  gulp.watch(`${resolvePath(paths().source.images)}/**/*.png`, { awaitWriteFinish: true }).on('change', gulp.series(taskPng, reload))
  gulp.watch(`${resolvePath(paths().source.images)}/**/*.svg`, { awaitWriteFinish: true }).on('change', gulp.series(taskSvg, reload))
  gulp.watch(`${resolvePath(paths().source.styleguide)}/**/*.*`, { awaitWriteFinish: true }).on('change', gulp.series(taskStyleguide, taskStyleguideCss, reloadCSS))

  const patternWatches = [
    `${resolvePath(paths().source.patterns)}/**/*.json`,
    `${resolvePath(paths().source.patterns)}/**/*.md`,
    `${resolvePath(paths().source.data)}/*.json`,
    `${resolvePath(paths().source.fonts)}/*`,
    `${resolvePath(paths().source.meta)}/*`,
    `${resolvePath(paths().source.annotations)}/*`
  ].concat(getTemplateWatches())

  gulp.watch(patternWatches, { awaitWriteFinish: true }).on('change', gulp.series(build, reload))
}
