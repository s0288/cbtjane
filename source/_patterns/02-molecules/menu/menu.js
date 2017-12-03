import $ from 'jquery'

import getUrlParameter from '../../../js/services/getUrlParameter'

const $icons = $('.menu svg')
const $views = $('.view > div')

const viewParam = getUrlParameter('view')

const hideEverything = () => {
  $icons.removeClass('menu__icon--active')
  $views.removeClass('view--active')
}

const showElemWithIndex = (index, $element) => {
  $views.eq(index).addClass('view--active')
  $element.addClass('menu__icon--active')
}

$icons.click((e) => {
  const $element = $(e.currentTarget)
  hideEverything()
  showElemWithIndex($icons.index($element), $element)
})

if (viewParam) {
  const index = parseInt(viewParam, 10)
  showElemWithIndex(index, $icons.eq(index))
} else {
  showElemWithIndex(0, $icons.eq(0))
}

