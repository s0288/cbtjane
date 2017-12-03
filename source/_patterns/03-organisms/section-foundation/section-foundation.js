import $ from 'jquery'

import Template from '../../../js/models/template'
import Foundation from '../../../js/models/foundations'
import Popup from '../popup/popup'

const PersonalCardsTemplate = require('../../02-molecules/personal-card/personal-card.mustache')


$('.section-foundation__path').click(() => {
  Promise.all([Template, Foundation]).then(([template, foundations]) => {
    const templates = template.getAll()
    console.log(foundations)
    const foundation1 = templates.find(({ id }) => id === '2')
    let cards = ''
    foundations.getAll().forEach((foundation, i) => {
      const json = {
        description: foundation['advantagelist-input'],
        number: i + 1
      }
      cards += `${PersonalCardsTemplate.render(json)}`
    })

    Popup.setHtml({
      html: `<h2 class="headline-v2">${foundation1.carddescription}</h2><p>${foundation1.description}</p>${cards}`,
      confirmationBtn: {
        cb() {
          Popup.close()
        }
      }
    })
  })
})
