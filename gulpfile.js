const gulp = require('gulp')

require('./config/gulp/tasks/patternlab-serve')(gulp)
require('./config/gulp/tasks/build-prod')(gulp)
require('./config/gulp/tasks/eslint')(gulp)
require('./config/gulp/tasks/stylelint')(gulp)

/* eslint global-require: 0 */
gulp.task('default', gulp.series(require('./config/gulp/tasks/patternlab-build')(gulp)))
