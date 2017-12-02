const qrcode = require('qrcode-terminal')
const ip = require('ip')

module.exports = (gulp) => {
  const name = 'qrcode'

  gulp.task('qrcode', (done) => {
    const link = `http://${ip.address()}:5000`
    qrcode.generate(link)
    console.log('\n\nOr enter this in the address bar:\n\n')
    console.log('\x1b[36m%s\x1b[0m', `${link}\n\n`)
    done()
  })

  return name
}
