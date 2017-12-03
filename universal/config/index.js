
// DEFAULT CONFIG
const config = {
  api: ''
}

if (process.env.NODE_ENV === 'production') {
  config.api = 'https://cbtjane.herokuapp.com'
} else if (process.env.NODE_ENV === 'staging') {
  config.api = 'https://cbtjane.herokuapp.com'
} else {
  config.api = 'http://localhost:5000'
}

module.exports = config
