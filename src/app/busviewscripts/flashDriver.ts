// FLASH_DRIVER

let flashCount = 0
let flashIntervalId
let oldFlashElem = null

export const flashElement = function (el) {
  if (flashCount > 0) {
    clearFlash(oldFlashElem, flashIntervalId)
  }
  oldFlashElem = el
  flashIntervalId = setInterval(function () {
/*         el.classList.toggle('flashing')  */
    if (el.style.borderColor === '') {
            // TODO:  Use toggle on "flashing" style defined in style sheet.
      el.style.borderColor = 'gold'
    } else {
      el.style.borderColor = ''
    }
    if (flashCount++ > 2) {
      clearFlash(el, flashIntervalId)
    }
  }, 600)
}

const clearFlash = function (el, id) {
  clearInterval(id)
  flashCount = 0
  if (el) {
    el.style.borderColor = ''
  }
}
