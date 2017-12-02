import $ from 'jquery'

const $icons = $('.menu svg').not(':first-child')

$icons.click((e) => {
  const element = e.currentTarget
  $icons.removeClass('menu__icon--active')
  $(element).addClass('menu__icon--active')
})

$icons.eq(0).addClass('menu__icon--active')
