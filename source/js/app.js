import $ from 'jquery'

import 'core-js'

import '../_patterns/02-molecules/menu/menu'

if ($('.section-letter').length !== 0) {
    import('../_patterns/03-organisms/section-letter/section-letter')
}

if ($('.section-foundation').length !== 0) {
    import('../_patterns/03-organisms/section-foundation/section-foundation')
}

if ($('.section-home').length !== 0) {
    import('../_patterns/03-organisms/section-home/section-home')
}
