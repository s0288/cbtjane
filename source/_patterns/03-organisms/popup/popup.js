import $ from 'jquery'

import Button from '../../01-atoms/button/button-v2'
import Listener from '../../../js/services/listener'

let element = document.getElementById('popup')

/** Cancel Button */
const cancelButton = {
  reference: new Button(),
  listener: new Listener(),
  initialize(btn) {
    cancelButton.reference = new Button(btn)
    cancelButton.reference.setText('Abbrechen')
    cancelButton.reference.setStyle('standard')
    $(btn).click(() => {
      cancelButton.listener.run()
    })
  },
  show() {
    $(cancelButton.reference.DOMElement).closest('.button-v2__container').removeAttr('hidden')
  },
  hide() {
    $(cancelButton.reference.DOMElement).closest('.button-v2__container').attr('hidden', 'hidden')
  },
  setText(text, animation = true) {
    if (text) {
      cancelButton.reference.setText(text, animation)
    } else {
      cancelButton.reference.setText('Abbrechen', animation)
    }
  }
}

/** Confirmation Button */
const confirmationButton = {
  reference: new Button(),
  listener: new Listener(),
  initialize(btn) {
    confirmationButton.reference = new Button(btn)
    confirmationButton.reference.setText('OK')
    confirmationButton.reference.setStyle('brand')
    $(btn).click((e) => {
      e.preventDefault()
      confirmationButton.listener.run()
    })
  },
  enable(text) {
    confirmationButton.reference.enable(text)
  },
  disable(text) {
    confirmationButton.reference.disable(text)
  },
  setText(text, animation) {
    if (text) {
      confirmationButton.reference.setText(text, animation)
    } else {
      confirmationButton.reference.setText('OK', animation)
    }
  },
  /**
   * Sets loading state of confirmation button.
   * @param {boolean} boolean
   * @param {string} [text] Optional text
   */
  setLoadingState(boolean, text) {
    confirmationButton.reference.setLoadingState(boolean)
    if (text) {
      confirmationButton.reference.setText(text)
    }
  }
}

/** Close Icon */
const closeIcon = {
  reference: $(element).find('.popup__close-icon'),
  listener: new Listener(),
  initialize(elem) {
    if (elem) {
      closeIcon.reference = $(elem)
    }
    closeIcon.reference.click(() => {
      closeIcon.listener.run()
    })
  },
  hide() {
    closeIcon.reference.attr('hidden', 'hidden')
  },
  show() {
    closeIcon.reference.removeAttr('hidden')
  }
}

/** Footer */
const footer = {
  reference: $(element).find('.popup__footer'),
  /** Must be called after popup.setHtml */
  show(text) {
    footer.reference.removeAttr('hidden')
    footer.reference.html(`<p><small>${text}</small></p>`)
  },
  hide() {
    footer.reference.attr('hidden', 'hidden')
  }
}


// PUBLIC
const popup = {

  cancelButton,
  confirmationButton,
  closeIcon,
  footer,

  isOpen() {
    return $(element).attr('hidden') !== 'hidden'
  },

  open() {
    $(element).removeAttr('hidden')
  },

  cleanUp() {
    popup.confirmationButton.listener.clear()
    popup.closeIcon.listener.clear()
    popup.cancelButton.listener.clear()
    popup.cancelButton.listener.add(popup.close)
    popup.closeIcon.listener.add(popup.close)
    closeIcon.show()
    footer.hide()
  },

  close() {
    $(element).attr('hidden', 'hidden')
    confirmationButton.enable()
  },

  getHtmlContainerReference() {
    return $(element).find('.popup__html').get(0)
  },

  /**
   * @typedef {Object} ConfirmationButtonParams
   * @property {Function | Array<Function>} [cb] Confirmation callback.
   * @property {string} [text] Sets the button text of the confirmation button
   */

  /**
   * @typedef {Object} cancelButtonParams
   * @property {string} [text] Sets the button text of the confirmation button
   * @property {boolean} [show] Sets the button visible. Default: hidden
   */

  /**
   * @typedef {Object} SetHtmlParams
   * @property {string} html Html to set into the popup.
   * @property {ConfirmationButtonParams} [confirmationBtn={}] Confirmation Button.
   * @property {cancelButtonParams} [cancelBtn={}] Cancel Button.
   * when popup form is validated
   * @property {Function} [closeCb] Callback Function. Called every time,
   */

  /**
   * Set html of popup and registers cb functions.
   * @param {SetHtmlParams} props Html to set into the popup.
   */
  setHtml(props) {
    const {
      html,
      confirmationBtn = {
        text: null
      },
      cancelBtn = {
        text: null,
        show: false
      },
      closeCb
    } = props

    popup.cleanUp()
    popup.confirmationButton.listener.add(confirmationBtn.cb)
    popup.cancelButton.listener.add(closeCb)
    popup.closeIcon.listener.add(closeCb)

    if (cancelBtn.show) {
      popup.cancelButton.show()
    } else {
      popup.cancelButton.hide()
    }

    if (!this.isOpen()) {
      $(element).find('.popup__html').html(html)
      popup.confirmationButton.setText(confirmationBtn.text, false)
      popup.cancelButton.setText(cancelBtn.text, false)
      popup.open()
    } else {
      element.classList.add('popup--change')
      setTimeout(() => {
        popup.confirmationButton.setText(confirmationBtn.text)
        popup.cancelButton.setText(cancelBtn.text)
        $(element).find('.popup__html').html(html)
      }, 300)
      setTimeout(() => {
        element.classList.remove('popup--change')
      }, 2000)
    }
  },

  /**
   * initialize popup on specific html element. Mostly needed for tests.
   * @param {HTMLElement} elem DOM Element to initialize the popup on.
   */
  setPopupReference(elem) {
    element = elem
    popup.confirmationButton.listener.clear()
    popup.confirmationButton.initialize($(elem).find('button').last().get(0))
    popup.cancelButton.initialize($(elem).find('button').first().get(0))
    popup.closeIcon.initialize($(elem).find('.popup__close-icon').get(0))
  }
}

if ($(element).length) {
  confirmationButton.initialize($(element).find('button').last().get(0))
  cancelButton.initialize($(element).find('button').first().get(0))
  closeIcon.initialize()
}

export default popup
