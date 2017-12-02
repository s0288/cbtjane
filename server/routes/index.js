const json = require('../../source/_patterns/04-templates/01-chatbot.json')

module.exports = (app) => {
  app.use('/huhu', (req, res) => {
    res.status(200)
  })
}
