const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const postcssFlexBugsFixes = require('postcss-flexbugs-fixes')
const normalizeSCSS = require('node-normalize-scss')
const cleanCSS = require('gulp-clean-css')
const sassVariables = require('gulp-sass-variables')
const packageJson = require('../../../package.json')

const { browserSync, resolvePath, paths } = require('../setup')

module.exports = (gulp) => {
  const name = 'sass'

  gulp.task(name, () => {
    const plugins = [
      autoprefixer({
        browsers: 'last 2 versions'
      }),
      postcssFlexBugsFixes
    ]

    return gulp.src(`${resolvePath(paths().source.css)}/*.scss`)
      .pipe(sassVariables({
        $version: packageJson.version
      }))
      // @ts-ignore
      .pipe(sass({
        includePaths: normalizeSCSS.includePaths
      }).on('error', sass.logError))
      .pipe(postcss(plugins))
      .pipe(cleanCSS({ debug: true }, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`)
        console.log(`${details.name}: ${details.stats.minifiedSize}`)
      }))
      .pipe(gulp.dest(resolvePath(paths().public.css)))
      .pipe(browserSync.stream())
  })

  return name
}
