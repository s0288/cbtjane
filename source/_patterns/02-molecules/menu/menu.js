import $ from 'jquery'

const $icons = $('.menu svg').not(':first-child')
const $views = $('.view > div')

$icons.click((e) => {
  const $element = $(e.currentTarget)
  $icons.removeClass('menu__icon--active')
  $views.removeClass('view--active')
  $element.addClass('menu__icon--active')

  switch ($icons.index($element)) {
    case 0:
      $views.eq(0).addClass('view--active')
      break
    case 1:
      $views.eq(1).addClass('view--active')
      break
    case 2:
      $views.eq(2).addClass('view--active')
      break
    default:
      break
  }
})

$icons.eq(0).addClass('menu__icon--active')
$views.eq(0).addClass('view--active')
