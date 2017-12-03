import $ from 'jquery'

import User from '../../../js/models/user'
import Template from '../../../js/models/template'
import Popup from '../popup/popup'

const CardsTemplate = require('../../02-molecules/card/card.mustache')

User.then((user) => {
  $('.section-home__avatar img').attr('src', user.getProfilePic())
  $('.section-home__name').html(user.getFirstName())
})

Template.then((template) => {
  let html = ''
  const mappedJSON = template.getAllAvailableTemplates().map(templ => ({
    title: `#${templ.number} ${templ.type}`,
    description: templ.carddescription,
    popup: templ.description,
    number: templ.number,
    type: templ.type
  }))
  mappedJSON.forEach((json) => {
    html += CardsTemplate.render(json)
  })
  $('.section-home__cards').html(html)
  $('.section-home__cards .card').click((e) => {
    const $element = $(e.currentTarget)
    const title = $element.find('.card__description').html()
    const description = $element.data('popup-description')
    Popup.setHtml({
      html: `<h2 class="headline-v2">${title}</h2><p>${description}</p>`,
      confirmationBtn: {
        cb() {
          Popup.close()
        }
      }
    })
    Popup.confirmationButton.reference.hide()
  })
})
