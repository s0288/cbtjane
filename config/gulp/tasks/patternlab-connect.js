
const { browserSync, resolvePath, paths } = require('../setup')

module.exports = (gulp) => {
  const name = 'patternlab:connect'

  gulp.task(name, gulp.series((done) => {
    browserSync.init({
      server: {
        baseDir: resolvePath(paths().public.root)
      },
      snippetOptions: {
        // Ignore all HTML files within the templates folder
        // @ts-ignore
        blacklist: ['/index.html', '/', '/?*']
      },
      notify: {
        styles: [
          'display: none',
          'padding: 15px',
          'font-family: sans-serif',
          'position: fixed',
          'font-size: 1em',
          'z-index: 9999',
          'bottom: 0px',
          'right: 0px',
          'border-top-left-radius: 5px',
          'background-color: #1B2032',
          'opacity: 0.4',
          'margin: 0',
          'color: white',
          'text-align: center'
        ]
      }
    }, () => {
      console.log('PATTERN LAB NODE WATCHING FOR CHANGES')
      done()
    })
  }))

  return name
}
