// For localization...
const stringResources = {
  'errReadModelSpec': 'Error reading model specification for {0}.'
}

export const getStringResource = function (key) {
  return stringResources[key]
}

export const readTextFile = function (file, callback) {
  let rawFile = new XMLHttpRequest()
  let readOK = false
  rawFile.overrideMimeType('application/json')
  rawFile.open('GET', file, true)
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status === 200) {
      readOK = true
      callback(rawFile.responseText)
    }
  }
  setTimeout(function () {
    if (!readOK) {
      alert(getStringResource('errReadModelSpec').format('buses'))
    }
  }, 1000)
  rawFile.send(null)
}

export const scrollToView = function (element) {
  let childContainer = element.parentElement
  let parentContainer = childContainer.parentElement
  if (childContainer.offsetTop > parentContainer.offsetTop + parentContainer.offsetHeight) {
    childContainer.scrollIntoView({behavior: 'smooth', block: 'end'})
  } else if (childContainer.offsetTop < parentContainer.offsetHeight - 60) {
    childContainer.scrollIntoView({behavior: 'smooth', block: 'start'})
  }
}

export const formatString = function (string, paramVal) {
  let result = string
  if (string) {
    result = format(string, paramVal)// code
  }
  return result
}

const format = function (s: string, ...args: any[]): string {
  var formatted = s
  for (var i = 0; i < args.length; i++) {
    var regexp = new RegExp('\\{' + i + '\\}', 'gi')
    formatted = formatted.replace(regexp, args[i])
  }
  return formatted
}
