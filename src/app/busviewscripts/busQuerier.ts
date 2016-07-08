// BUS_DA
// BUS View Data Accessor
import * as NMM_UTILITY from './utility'
// import * as busModel from './busModel'
import {BusModel} from './BusModel'
import {StationsModel} from './StationsModel'

let cimnetQuerier
let busModelSpec
let busesReadyCallback = null
let terminalsQueriesDoneCallback = null
let currentBusId = null
let terminalQueryIndex = 0
let violationTerminalIterator = null
export let busModel = null
let stationsModel = null

export const populateBuses = function (querier, workspaceId, configUrl, callback) {
  busesReadyCallback = callback
  cimnetQuerier = querier
  cimnetQuerier.addEventListener('arrived', this.handleQueryResults)

  if (!busModelSpec) {
    NMM_UTILITY.readTextFile(configUrl, function (text) {
      busModelSpec = JSON.parse(text)
      requestData(workspaceId)
    })
  } else {
    requestData(workspaceId)
  }
}

export const getBusModelSpec = function () {
  return busModelSpec
}

export const showSelectedBusDiagram = function (busID, queryDoneCallback) {
  if (!busModel.hasBusInfo(busID)) {
    busModel.clearTerminalsFromBus(busID)
    currentBusId = busID
    terminalQueryIndex = 0
    queryTerminalData(terminalQueryIndex++)
    terminalsQueriesDoneCallback = queryDoneCallback
  } else {
    if (queryDoneCallback) {
      queryDoneCallback(busID)
    }
  }
}

export const handleQueryResults = function (e) {
  let data = e.detail.data
  if (data) {
          // Populate VoltageLevels from data.
    if (data.SubstationList) {
      stationsModel = new StationsModel()
      stationsModel.fillData(data.SubstationList)
              // Query TopologicalNode.
      cimnetQuerier.setAttribute('query', busModelSpec.buses[0].dgQuery)
    } else if (data.TopologicalNodeList) {
      busModel = new BusModel()
      busModel.fillData(data.TopologicalNodeList, getBusClassName(), true, getBusIdAttributeName())
      busesReadyCallback(busModel)
    } else if (data.CurrentViolationList) {
      processViolation(data.CurrentViolationList)
      queryTerminalViolations()
    } else { // Assume they are terminals of various derived classes {
      let listProperty = Object.keys(data)[0]
      // data could be an empty object, or empty nodesList.
      if (listProperty && data[listProperty] !== '') {
        let terminalClassName = getTerminalClassNameFromResponse(data)
        if (data[listProperty][terminalClassName].length > 0) {
          // Bad Workaround
          busModel.attachTerminalsToBus(data[listProperty], currentBusId,
                  false, terminalClassName)
        }
      }
      queryTerminalData(terminalQueryIndex++)
    }
  }
}

export const getSubstations = function () {
  return stationsModel.getSubstations()
}

export const clearBusModel = function () {
  busModel.clear()
  stationsModel.clear()
}

const requestData = function (workspaceId) {
  if (busModelSpec && busModelSpec.buses) {
    cimnetQuerier.setAttribute('workspace', workspaceId)
    cimnetQuerier.setAttribute('query', 'SELECT mRID AS ID,name FROM Substation')
  }
}

const queryTerminalData = function (terminalIndex) {
      // alert (terminalIndex, querier);
  if (busModelSpec && busModelSpec.buses) {
    let terminals = busModelSpec.buses[0].children
    let query = terminals[terminalIndex++].dgQuery
    if (terminalIndex < terminals.length && query) {
      query = NMM_UTILITY.formatString(query, currentBusId)
      cimnetQuerier.setAttribute('query', query)
    } else {
      // initialize ViolationQueryContext
      const busInfo = busModel.getBusInfo(currentBusId)
      violationTerminalIterator = new TerminalIterator(busInfo)
      queryTerminalViolations()
    }
  }
}

const queryTerminalViolations = function () {
  let terminalInst = violationTerminalIterator.next()
  if (terminalInst) {
    // let query = busModelSpec.buses[0].getVoilationQuery(terminalInst.class)
    let query = 'SELECT mRID,CurrentLimit.OperationalLimitSet.Terminal AS ' +
                'violatedTerminal from CurrentViolation WHERE ' +
                'CurrentLimit.OperationalLimitSet.Terminal.mRID={0}'
    cimnetQuerier.setAttribute('query', NMM_UTILITY.formatString(query, terminalInst.instance.ID))
  } else {
    if (terminalsQueriesDoneCallback) {
      terminalsQueriesDoneCallback(currentBusId)
    }
  }
}

const processViolation = function (violations) {
  let terminalInst = violationTerminalIterator.current
  let bus = busModel.getBusInfo(currentBusId)
  let impl = new TerminalImpl(bus)
  if (violations.CurrentViolation.length > 0) {
    impl.updateTerminalOnBus(terminalInst.class, terminalInst.instance.ID, 'hasViolations', true)
  }
}

var getBusIdAttributeName = function () {
  if (busModelSpec && busModelSpec.buses) {
    let busDef = busModelSpec.buses
    return busDef[0].id// code
  }
  console.log('error getting BusModelSpec!')
  return null
}

let getBusClassName = function () {
  if (busModelSpec && busModelSpec.buses) {
    let busDef = busModelSpec.buses
    return busDef[0].type        // code
  }
  return null
}

let getTerminalClassNameFromResponse = function (data) {
      // This assumes the data returns the list as the first property.
  let listProperty = Object.keys(data)[0]
  let className = null
  if (data[listProperty] !== '') {
    className = Object.keys(data[listProperty])[0]
  }
      // Then the first property of data.<listProerty> is the className.
    // return Object.keys(data[listProperty])[0]
  return className
}

/*  let getParentRelationshipName = function (className) {
  if (busModelSpec && busModelSpec.buses) {
    let busDef = busModelSpec.buses
    for (let child of busDef[0].children) {
      if (child.type === className) {
        return child.parent// code
      }
    }
  }
  return null
}
*/

class TerminalIterator {

  bus: any;
  currentClassIndex: any;
  currentIndex: any;
  current: any;

// Iterate through all children of a Bus (BusInfo)
  constructor (bus) {
    this.bus = bus
    this.currentClassIndex = 0
    this.currentIndex = 0
    this.current = null
  }

/*
  current () {
    return this.current
  }
*/

  next () {
    const keys = Array.from(this.bus.children.keys())
    let next = null
    if (this.currentClassIndex < keys.length) {
      let key = keys[this.currentClassIndex]
      let instances = this.bus.children.get(key)
      if (this.currentIndex < instances.length) {
        next = {class: key, instance: instances[this.currentIndex++]}
      } else {
        if (this.currentClassIndex === keys.length - 1) {
          next = null
        } else {
          this.currentClassIndex++
          key = keys[this.currentClassIndex]
          instances = Array.from(this.bus.children.get(key))
          this.currentIndex = 0
          next = {class: key, instance: instances[this.currentIndex++]}
        }
      }
    }
    this.current = next
    return next
  }
}

class TerminalImpl {

  bus: any;

  constructor (bus) {
    this.bus = bus
  }
  _getTerminal (className, id) {
    const instances = this.bus.children.has(className) ? this.bus.children.get(className) : null
    if (instances) {
      for (let instance of instances) {
        if (instance.ID === id) {
          return instance
        }
      }
      return null
    }
  }
  updateTerminalOnBus (className, id, prop, value) {
    let instance = this._getTerminal(className, id)
    if (instance) {
      instance[prop] = value
    }
  }
}
