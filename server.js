const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const mustacheLayout = require('mustache-layout')
const path = require('path')

const routes = require('./server/routes/index.js')

const corsOptionsObject = {
  origin(origin, callback) {
    callback(null, true)
  },
  credentials: true
}

const app = express()
const staticPath = path.join(__dirname, 'public')

app.use(helmet())
app.options('*', cors(corsOptionsObject))
app.use(cors(corsOptionsObject))
// to support JSON-encoded bodies
app.use(bodyParser.json())
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '2mb'
}))

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheLayout)
app.set('view engine', 'mustache')
app.set('view options', { layout: true })
app.set('views', path.join(__dirname, 'source/_patterns'))
app.set('port', process.env.PORT || 5000)

app.use(compression())

app.use(express.static(staticPath, { maxAge: 604800000 }))

// Load Routes
routes(app)

// Start Server
app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`)
})
