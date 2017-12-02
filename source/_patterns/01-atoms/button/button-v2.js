const template = require('./button-v2.mustache')

class BaseButton {
  static render(props) {
    return template(props)
  }

  constructor(DOMElement) {
    this.DOMElement = DOMElement
  }

  /**
   * Disables button
   * @param {string} [text] Set optional text
   */
  disable(text) {
    this.DOMElement.disabled = true
    if (text) {
      this.setText(text)
    }
  }
  /**
   * Enables button and animates it
   * @param {string} [text] Set optional text
   */
  enable(text) {
    this.DOMElement.disabled = false
    if (text) {
      this.setText(text)
    }
  }
  /** Shows the button */
  show() {
    this.DOMElement.classList.remove('button-v2--hidden')
  }
  /** Hides the button */
  hide() {
    this.DOMElement.classList.add('button-v2--hidden')
  }
  /** Sets the button text */
  setText(text = '') {
    this.DOMElement.innerHTML = text
  }
  /** Sets the button style. [brand|ghost] */
  setStyle(style = 'brand') {
    this.DOMElement.classList.remove('button-v2--brand')
    this.DOMElement.classList.remove('button-v2--ghost')
    switch (style) {
      case 'brand':
        this.DOMElement.classList.add('button-v2--brand')
        break
      case 'ghost':
        this.DOMElement.classList.add('button-v2--ghost')
        break
      default:
        this.DOMElement.classList.add('button-v2--brand')
    }
  }
}

class AnimatedButton extends BaseButton {
  /** Animates button. "3D" effect */
  animateButton() {
    this.DOMElement.classList.add('button-v2--change')
    setTimeout(() => {
      this.DOMElement.classList.remove('button-v2--change')
    }, 600)
  }
  /**
   * Enables button and animates it
   * @param {string} [text] Set optional text
   */
  enable(text) {
    super.enable(text)

    if (text) {
      this.animateButton()
    }
  }

  /**
   * Set the loading state of button
   * @param {boolean} bool Set loading state of button. true|false
   * @param {string} [text] Sets optional text, if loading state is deactivated
   */
  setLoadingState(bool, text) {
    if (bool) {
      window.clearTimeout(this.inactiveLoadingStateTimeout)
      this.disable()
      this.DOMElement.classList.add('button-v2--loader')
      this.activeLoadingStateTimeout = window.setTimeout(() => {
        this.DOMElement.classList.add('button-v2--loading')
      }, 150)
    } else {
      window.clearTimeout(this.activeLoadingStateTimeout)
      this.DOMElement.classList.remove('button-v2--loading')
      this.inactiveLoadingStateTimeout = window.setTimeout(() => {
        this.DOMElement.classList.remove('button-v2--loader')
      }, 150)
      this.enable(text)
    }
  }
  /**
   * Set button text
   * @param {string} text Button text
   * @param {boolean} [animation] Animates button.
   */
  setText(text, animation = true) {
    super.setText(text)
    if (animation) {
      this.animateButton()
    }
  }
}

export default AnimatedButton
