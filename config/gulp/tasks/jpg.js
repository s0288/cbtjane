const imageResize = require('gulp-image-resize')
const rename = require('gulp-rename')

const {
  resolvePath,
  paths
} = require('../setup')

module.exports = (gulp) => {
  const name = 'pl-copy:jpg'

  if (process.env.NODE_ENV === 'test') {
    gulp.task(name, () => Promise.all([
      new Promise((resolve) => {
        gulp.src(['**/*.jpg', '**/*.jpeg'], { cwd: resolvePath(paths().source.images) })
          .pipe(gulp.dest(resolvePath(paths().public.images)))
          .on('end', resolve)
      }),
      new Promise((resolve) => {
        gulp.src(['**/*@2x.jpeg', '**/*@2x.jpg'], { cwd: resolvePath(paths().source.images) })
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
    const imageminMozjpeg = require('imagemin-mozjpeg')
    const imagemin = require('gulp-imagemin')
    gulp.task(name, () => Promise.all([
      new Promise((resolve) => {
        gulp.src(['**/*.jpg', '**/*.jpeg'], { cwd: resolvePath(paths().source.images) })
          .pipe(imagemin([imageminMozjpeg({ quality: 80 })]))
          .pipe(gulp.dest(resolvePath(paths().public.images)))
          .on('end', resolve)
      }),
      new Promise((resolve) => {
        gulp.src(['**/*@2x.jpeg', '**/*@2x.jpg'], { cwd: resolvePath(paths().source.images) })
          .pipe(imageResize({
            percentage: 50
          }))
          .pipe(rename((path) => {
            path.basename = path.basename.substr(0, path.basename.lastIndexOf('@'))
          }))
          .pipe(imagemin([imageminMozjpeg({ quality: 80 })]))
          .pipe(gulp.dest(resolvePath(paths().public.images)))
          .on('end', resolve)
      })
    ]))
  }

  return name
}
