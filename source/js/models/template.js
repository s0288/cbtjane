import * as Config from '../../../universal/config'
import * as Api from '../../../universal/services/api'
import User from './user'

let templates = []
let webapp = []

const template = {
  getType(templateType) {
    return templates.filter(({ type }) => type === templateType)
  },
  getAll() {
    return templates
  },
  getAllAvailableLetters() {
    const activeTemplateIDs = webapp
      .filter(({ available }) => available === 'TRUE')
      .map(({ templateid }) => templateid)
    return templates
      .filter(({ id, type }) => activeTemplateIDs.includes(id) && type === 'letter')
  },
  getAllAvailableTemplates() {
    const activeTemplateIDs = webapp
      .filter(({ available, activated }) => available === 'TRUE' && activated === 'FALSE')
      .map(({ templateid }) => templateid)
    return templates.filter(({ id }) => activeTemplateIDs.includes(id))
  }
}

const Template = new Promise((resolve) => {
  User.then((user) => {
    const templateRequest = Api({
      method: 'GET',
      baseURL: Config.api,
      url: '/backend/templates'
    })
    const webappRequest = Api({
      method: 'GET',
      baseURL: Config.api,
      url: `/backend/webapp/${user.getID()}`
    })

    Promise.all([templateRequest, webappRequest]).then(([requestedTemplates, requestedWebapp]) => {
      templates = requestedTemplates
      webapp = requestedWebapp
      resolve(template)
    })
  })
})

export default Template
