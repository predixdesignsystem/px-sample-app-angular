// BUS_VIEW
import * as NMM_UTILITY from './utility'
import * as BUS_DA from './busQuerier'
import {BusConfig} from './BusConfig'

const stringResources = {
  'searchBusCaption': 'Search Topological Nodes',
  'openedBusesCaption': 'Currently Open',
  'stationsCaption': 'Substations',
  'allBusesCaption': 'All',

  'WARN_MISSING_FIELD_VALUE': 'Missing field value for {0}'
}

  // Map of buses by mRID already shown.
let renderedBuses = new Map()

let busConfig = null

let closeCallback = null
let drawBusCallback = new Map()

let currentStation
let currentBusId = null
let focusedTerminalId = null

export const getStringResource = function (key) {
  return stringResources[key]
}

export const showSelectedBusDiagram = function (busId) {
  BUS_DA.showSelectedBusDiagram(busId, showTerminalsQueryResultOfBus)
}

export const clearBusDiagrams = function (ignoreClearStation) {
  for (let [key,value] of Array.from(renderedBuses.entries())) {
    let busDiagram: any = renderedBuses.get(key)
    let busDiagramContainer = busDiagram.parentNode
    busDiagram.removeEventListener('navigate', handleNavigateToBus)
    busDiagram.removeEventListener('navigateToTabular', handleNavigateToTabular)
    busDiagramContainer.remove()
  }
  renderedBuses.clear()
  if (!ignoreClearStation) {
    currentStation = null
  }
  currentBusId = null
  focusedTerminalId = null
}

export const closeAllBusDiagrams = function () {
  clearBusDiagrams(true)
  callDrawnListeners()
}

export const isRendered = function (busId) {
  return renderedBuses.has(busId)
}

export const getAvailBusesInStation = function (stationId) {
  if (stationId) {
    // TODO:  BusGadget needs to define the query result column name for "ID".
    let busesInStation = BUS_DA.busModel.getBusesBySubstation(stationId, busConfig.getBusParentAttributeName())
    currentStation = stationId
    return busesInStation.filter(function (bus) { return !isRendered(bus.ID) })
  } else {
    return []
  }
}

export const getAvailableBuses = function () {
  return getAvailBusesInStation(currentStation)
}

export const getRenderedBuses = function () {
  let rendered = []
  for (let [busKey,value] of Array.from(renderedBuses.entries())) {
    rendered.push(BUS_DA.busModel.getBusInfo(busKey))
  }
  return rendered
}

export const setBusDrawnCallback = function (key, callback) {
  drawBusCallback.set(key, callback)
}

export const setCloseCallback = function (callback) {
  closeCallback = callback
}

export const closeBusDiagram = function (busID) {
  let busDiagram: any = renderedBuses.get(busID)
  let busDiagramContainer: any = busDiagram.parentNode
  cleanUpBusDiagram(busDiagramContainer, busDiagram, busID)
}

export const setBusConfig = function (busConfigFromInput) {
  busConfig = new BusConfig(busConfigFromInput)
}

const applyFlexWrap = function () {
        // This is a work-around for flex-wrap causing the first diagram drawn outside of the container.
  const host = document.querySelector('#buses-container')
  if (renderedBuses.size > 1) {
    host.classList.add('flex-wrap')
  } else {
    host.classList.remove('flex-wrap')
  }
}

const createBusDiagramNode = function () {
  let elem = document.createElement('div')
  elem.setAttribute('class', 'hidden diagram-on-right')
  let btnElem = document.createElement('paper-button')
  btnElem.setAttribute('id', 'btn-close')
  btnElem.setAttribute('class', 'close-button')
  btnElem.innerHTML = 'X  Hide'
  let busDiagram = document.createElement('bus-tree')
  elem.appendChild(btnElem)
  elem.appendChild(busDiagram)
  return elem
}

const showTerminalsQueryResultOfBus = function (busID) {
  let busDiagram = null
  if (renderedBuses.size === 0 || !renderedBuses.has(busID)) {
    let clone = createBusDiagramNode()
    busDiagram = clone.querySelector('bus-tree')
    const closeButton = clone.querySelector('#btn-close')

    const host = document.querySelector('#buses-container')
    host.appendChild(clone)
    let treeData = buildTreeDefinition(busID)
    busDiagram = configureBusDiagram(busDiagram, treeData)
    renderedBuses.set(busID, busDiagram)
    applyFlexWrap()

    closeButton.addEventListener('click', function (e) {
      const busDiagramContainer = busDiagram.parentNode
      cleanUpBusDiagram(busDiagramContainer, busDiagram, busID)
    })
  } else {
    busDiagram = renderedBuses.get(busID)
  }
  NMM_UTILITY.scrollToView(busDiagram)
  if (currentBusId) {
    const oldDiagramInFocus: any = renderedBuses.get(currentBusId)
    oldDiagramInFocus.parentNode.classList.toggle('current-bus')
  }
  currentBusId = busID
  busDiagram.parentNode.classList.toggle('current-bus')
  callDrawnListeners()
  if (focusedTerminalId) {
    busDiagram.setAttribute('focused', focusedTerminalId)
    focusedTerminalId = null
  }
}

const cleanUpBusDiagram = function (busDiagramContainer, busDiagram, busID) {
  busDiagram.removeEventListener('navigate', handleNavigateToBus)
  busDiagram.removeEventListener('navigateToTabular', handleNavigateToTabular)
  busDiagramContainer.remove()
  renderedBuses.delete(busID)
  applyFlexWrap()
  if (currentBusId === busID) {
    currentBusId = null
  }
  if (closeCallback) {
    closeCallback()
  }
}

export const focusOnTerminal = function (terminalId) {
  focusedTerminalId = terminalId
}

const callDrawnListeners = function () {
  for (let [key, callback] of Array.from(drawBusCallback.entries())) {
    if (callback) {
      (<() => any> callback)()
    }
  }
}

const configureBusDiagram = function (busDiagram, treeData) {
  // let tree = {}
  // tree.treeData = treeData
  busDiagram.setAttribute('tree-definition', JSON.stringify(treeData))
  busDiagram.addEventListener('navigate', handleNavigateToBus)
  busDiagram.addEventListener('navigateToTabular', handleNavigateToTabular)
  busDiagram.parentNode.classList.remove('hidden')
  busDiagram.parentNode.classList.add('shown')
  return busDiagram
}

const buildTreeDefinition = function (busID) {
  const bus = BUS_DA.busModel.getBusInfo(busID)
  let treeData: any = {}
  treeData.id = busID
  treeData.caption = getBusCaption(bus)
  treeData.leftNodes = []
  treeData.rightNodes = []
  treeData.hasBranchViolations = false
  // AQL: This (let key of buss.children.keys()) does not produce the correct code in JS, children is a Map ...
  const children: Map<any,any> = bus.children;
  for (let [key,value] of Array.from(children.entries())) {
    const list = bus.children.get(key)
    if (busConfig.getIsMultiClass(key)) {
      addNodeToTreeData(treeData, list, treeData.rightNodes, key)
    } else {
      addNodeToTreeData(treeData, list, treeData.leftNodes, key)
    }
  }
  return treeData
}

const addNodeToTreeData = function (treeData, list, treeNodesList, key) {
  for (let i = 0; i < list.length; i++) {
    const entity = list[i]
    const node = createTreeNode(entity, key)
    treeNodesList.push(node)
    // treeData.hasBranchViolations |= node.hasViolations
  }
}

const createTreeNode = function (entity, className) {
  let navigator = null
  let textVal = className
  const icon = busConfig.getTerminalIcon(className, entity.hasViolations)
  const titleField = busConfig.getTerminalTitleFieldName(className)

  let node
  if (entity.NEXT_BUS && entity.NEXT_TERMINAL) {
    navigator = getToEndLink(entity.NEXT_BUS, entity.NEXT_TERMINAL)
    textVal = navigator.linkText
  }
  const nodeLayout = busConfig.getTerminalLayout(className)
  let rowLayout = []
  let content: any = {}
  if (nodeLayout) {
    for (let fieldLayout of nodeLayout) {
      let newFieldLayout: any = Object.assign({}, fieldLayout)
      newFieldLayout.value = entity[fieldLayout.field]
      rowLayout.push(newFieldLayout)
    }
    content.rows = rowLayout
    if (icon) {
      content.iconSrc = '/images/' + icon.src
      content.iconAtEnd = icon.atEnd
    }
    node = {'type': 'custom', 'caption': entity[titleField],
            'content': content, 'navigateTo': navigator,
            'className': className}
    let tabularNavigator = getTabularNavigator(className, entity)
    if (tabularNavigator) {
      node.tabularNavigator = tabularNavigator
    }
    node.type = icon ? 'custom&icon' : 'custom'
  } else {
    if (icon) {
      node = {'type': 'string&icon', 'caption': entity[titleField],
                'content': {'iconSrc': '/images/' + icon.src, 'iconAtEnd': icon.atEnd, 'text': textVal},
                'navigateTo': navigator }
    } else {
      node = {'type': 'string', 'caption': entity[titleField],
              'content': { 'text': textVal }, 'navigateTo': navigator}
    }
  }
  node.id = entity.ID
  if (entity.hasViolations) {
    node.hasViolations = entity.hasViolations
  }
  return node
}

const getToEndLink = function (busId, terminalId) {
  const navigator: any = {}
  navigator.linkValue = {'bus': busId, 'terminal': terminalId}
  const nextBus = BUS_DA.busModel.getBusInfo(busId)
  const nextBusLinkDef = busConfig.getBusLinkDef()
  if (nextBusLinkDef) {
    navigator.linkText = getFieldValue(nextBusLinkDef.caption, nextBus)
    navigator.tooltip = getFieldValue(nextBusLinkDef.tooltip, nextBus)
  }
  return navigator
}

const getTabularNavigator = function (className, entity) {
  let inNavigator = busConfig.getNavigator(className)
  if (inNavigator) {
    let navigator = Object.assign({}, inNavigator)
    if (navigator.destinationID) {
      navigator.className = getFieldValue(navigator.className, entity)
      navigator.destinationID = getFieldValue(navigator.destinationID, entity)
      return navigator
    }
  }
  return null
}

const getFieldValue = function (fieldsOrValue, instanceData) {
  // Detect any number of field references enclosed in a pair of '%'
  // Replace each with instanceData[field reference].
  const replaceFieldWithValue = function (match) {
    const fieldValue = instanceData[match.substring(1, match.length - 1)]
    if (!fieldValue) {
      console.warn(getStringResource('WARN_MISSING_FIELD_VALUE').format(match))
    }
    return fieldValue
  }

  return fieldsOrValue.replace(/%([^%]+)%/g, replaceFieldWithValue)
}

const handleNavigateToTabular = function (e) {
  const toLink = e.detail.destination
  this.fire('busViewNavigateTo', {destination: toLink})
}

const handleNavigateToBus = function (e) {
  let toLink = e.detail.toId
  focusedTerminalId = toLink.terminal
  BUS_DA.showSelectedBusDiagram(toLink.bus, showTerminalsQueryResultOfBus)
}

// Input Object:
//				"dgCaption": {
//      			"title": [ "Substation", "name" ],
//      			"subtitle": [{"label": "Sub-Region", "field":"SubGeoRegion"}],
//      			"bigLabel": {"field": "BaseV", "unit": "kv", "lavel": "abc: "},
//      			"fieldsList": [{"field": "<fieldName>", "unit": "...", "digits": "..."}, ...]
//                          e.g.  {"field": "angle", "unit": "degrees", "digits":"1"},...
//     }
// Returns :
// caption: {
//        "title", "subtitle", "bigLabel", "bigLabelUnit", "topLevelFields": [{value:"...", unit:"..."},...]
//     }
const getBusCaption = function (bus) {
  let caption: any = { title: '', subtitle: '' }
  const inCaption = busConfig.getBusCaptionDefinition()
  if (inCaption) {
    caption.title = getFieldValue(inCaption.title, bus)
    caption.subtitle = inCaption.subtitle.label + ': ' + bus[inCaption.subtitle.field]
    caption.bigLabel = bus[inCaption.bigLabel.field]
    caption.bigLabelUnit = inCaption.bigLabel.unit
    caption.fieldsList = []
    for (let inField of inCaption.fieldsList) {
      let field: any = {}
      const value = bus[inField.field]
      if (inField.decimalDigits) {
        field.value = parseFloat(value).toFixed(inField.decimalDigits)
      } else {
        field.value = value
      }
      field.label = inField.label
      field.unit = inField.unit
      caption.fieldsList.push(field)
    }
  }
  return caption
}