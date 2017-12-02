const imageResize = require('gulp-image-resize')
const rename = require('gulp-rename')

const {
  resolvePath,
  paths
} = require('../setup')

module.exports = (gulp) => {
  const name = 'pl-copy:png'

  if (process.env.NODE_ENV === 'test') {
    gulp.task(name, () => Promise.all([
      new Promise((resolve) => {
        gulp.src(['**/*.png'], { cwd: resolvePath(paths().source.images) })
          .pipe(gulp.dest(resolvePath(paths().public.images)))
          .on('end', resolve)
      }),
      new Promise((resolve) => {
        gulp.src(['**/*@2x.png'], { cwd: resolvePath(paths().source.images) })
          .pipe(imageResize({
            percentage: 50
          }))
          .pipe(rename((path) => {
            /* eslint no-param-reassign: 0 */
            path.basename = path.basename.substr(0, path.basename.lastIndexOf('@'))
          }))
          .pipe(gulp.dest(resolvePath(paths().public.images)))
          .on('end', resolve)
      })
    ]))
  } else {
    /* eslint global-require: 0 */
    const imagemin = require('gulp-imagemin')
    const imageminPngquant = require('imagemin-pngquant')
    gulp.task(name, () => Promise.all([
      new Promise((resolve) => {
        gulp.src(['**/*.png'], { cwd: resolvePath(paths().source.images) })
          .pipe(imagemin([imageminPngquant({ quality: '80' })]))
          .pipe(gulp.dest(resolvePath(paths().public.images)))
          .on('end', resolve)
      }),
      new Promise((resolve) => {
        gulp.src(['**/*@2x.png'], { cwd: resolvePath(paths().source.images) })
          .pipe(imageResize({
            percentage: 50
          }))
          .pipe(imagemin([imageminPngquant({ quality: '80' })]))
          .pipe(rename((path) => {
            /* eslint no-param-reassign: 0 */
            path.basename = path.basename.substr(0, path.basename.lastIndexOf('@'))
          }))
          .pipe(gulp.dest(resolvePath(paths().public.images)))
          .on('end', resolve)
      })
    ]))
  }

  return name
}
