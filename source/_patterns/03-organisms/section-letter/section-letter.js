import $ from 'jquery'

import User from '../../../js/models/user'
import Template from '../../../js/models/template'
import Popup from '../popup/popup'

const CardsTemplate = require('../../02-molecules/card/card.mustache')

User.then((user) => {
  $('.section-home__avatar img').attr('src', user.getProfilePic())
})

Template.then((template) => {
  let html = ''
  const mappedJSON = template.getAllAvailableLetters().map(templ => ({
    title: `#${templ.number} ${templ.type}`,
    description: templ.carddescription,
    popup: templ.description,
    number: templ.number,
    type: templ.type
  }))
  mappedJSON.forEach((json) => {
    html += CardsTemplate.render(json)
  })
  $('.section-letter__cards').html(html)
  $('.section-letter__cards .card')
    .click((e) => {
      const $element = $(e.currentTarget)
      const title = $element.find('.card__description').html()
      const description = $element.data('popup-description')
      Popup.setHtml({
        html: `<h2>${title}</h2><p>${description}</p>`,
        confirmationBtn: {
          cb() {
            Popup.close()
          }
        }
      })
    })
    .each(function showCards(index) {
      setTimeout(() => {
        $(this).addClass('card--active')
      }, 500 * index)
    })
})
