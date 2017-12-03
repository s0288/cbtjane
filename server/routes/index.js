const GoogleSpreadsheet = require('google-spreadsheet')

const doc = new GoogleSpreadsheet('1ajLqOkr_ycy_LzS-KM1tee-hfVxA7sa1GXtNEDiCDHY')
const cred = require('../config/googleCredentials')

const spreadSheet = {}

const getCurrentSpreadSheet = sheet => new Promise((resolve, reject) => {
  doc.useServiceAccountAuth(cred, (err) => {
    // Get all of the rows from the spreadsheet.
    if (err) {
      reject(err)
      return
    }
    doc.getRows(sheet, (err1, rows) => {
      spreadSheet[sheet] = rows
      if (!err1) {
        resolve(rows)
      } else {
        reject(err)
      }
    })
  })
})

module.exports = (app) => {
  app.use('/huhu', (req, res) => {
    res.status(200)
  })

  app.get('/backend/templates', (req, res) => {
    getCurrentSpreadSheet(1).then((sheet) => {
      console.log(sheet)
      res.json(sheet)
    })
  })

  app.get('/backend/users/:id', (req, res) => {
    getCurrentSpreadSheet(2).then((sheet) => {
      const filtered = sheet.filter(({ chatfuelid }) => chatfuelid === req.params.id)
      res.json(filtered)
    })
  })

  app.get('/backend/webapp/:id', (req, res) => {
    getCurrentSpreadSheet(3).then((sheet) => {
      const filtered = sheet.filter(({ chatfuelid }) => chatfuelid === req.params.id)
      res.json(filtered)
    })
  })

  app.get('/backend/foundation_1/:id', (req, res) => {
    getCurrentSpreadSheet(4).then((sheet) => {
      const filtered = sheet.filter(({ chatfuelid }) => chatfuelid === req.params.id)
      res.json(filtered)
    })
  })
}
