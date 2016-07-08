export class BusModel {

  rootsMap: any;
  static stringResources: any;

  constructor () {
    this.rootsMap = new Map()
    BusModel.stringResources = {
      'infoNoInstance': 'Missing {0} in this model.'
    }
  }

  static getStringResource (key) {
    return this.stringResources[key]
  }

    // export const getBusesBySubstation(stationName, stationProperty) {
  getBusesBySubstation (stationName, stationProperty) {
    return Array.from(this.rootsMap.values()).filter(
        busInstance => busInstance[stationProperty] === stationName)
  }

  hasBusInfo (busID) {
    const bus = this.rootsMap.get(busID)
    return bus && bus.children ? bus.children.size > 0 : false
  }

  getBusInfo (busID) {
    return this.rootsMap.get(busID)
  }

  clear () {
    this.rootsMap = new Map()
  }

  clearTerminalsFromBus (busID) {
    const bus = this.rootsMap.get(busID)
    if (bus) {
      bus.children = new Map()
    }
  }

  fillData (data, className, isParent, idAttributeName) {
    if (data) {
      let entities = this.rootsMap
      this._createMembersIntoHierarchy(data, className, isParent,
        function (entity) {
            // After creation, do the following:
          entities.set(entity[idAttributeName], entity)
        })
    }
  }

  attachTerminalsToBus (data, busId, isParent, className) {
    if (data) {
      let entities = this.rootsMap
      const addToParent = this._addToParent
      this._createMembersIntoHierarchy(data, className, isParent,
        function (entity) {
          addToParent(entities.get(busId), entity, className)
        })
    }
  }

	// After successful creation, call the "inject" function which takes the entity.
  _createMembersIntoHierarchy (data, className, isParent, inject) {
    let nodesList = data[className]
    for (let i = 0; i < nodesList.length; i++) {
      const entity = Object.assign({}, nodesList[i])
      if (isParent) {
        entity.children = new Map() // code
      }
      inject(entity)
    }
  }

  _addToParent (parent, entity, className) {
    let list
    if (!parent.children.has(className)) {
      list = []
      parent.children.set(className, list)
    } else {
      list = parent.children.get(className)
    }
    list.push(entity)
    parent.children.set(className, list)
  }
}
