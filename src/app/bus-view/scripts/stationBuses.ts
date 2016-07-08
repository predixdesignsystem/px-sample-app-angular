// STATION_BUSES
import * as BUS_VIEW from './busMain'

let shownItemValues = []

export const showAllBusDiagrams = function (busItems) {
  shownItemValues = []
  for (let busItem of busItems.values()) {
    shownItemValues.push(busItem.value)
  }

  // AQL: Apparantly, Array.sort expects number! Good catch, TypeScript!
  shownItemValues.sort(function (bus1, bus2) {
    //TODO:  Read the "Container" from BusGadget.config file as Station Sort Field.
    return Number.parseInt(bus1.Container) -
              Number.parseInt(bus2.Container);
  });
  BUS_VIEW.setBusDrawnCallback('allStation', drawNextBus)
  drawNextBus()
}

export const drawNextBus = function () {
  if (shownItemValues.length > 0) {
    let busValue = shownItemValues.pop()
    BUS_VIEW.showSelectedBusDiagram(busValue)
  } else {
    BUS_VIEW.setBusDrawnCallback('allStation', null)
  }
}

export const setAllEnabledState = function () {
  let allButton = document.getElementById('allNodes')
  if (BUS_VIEW.getAvailableBuses().length > 0) {
    allButton.removeAttribute('disabled')
  } else {
    allButton.setAttribute('disabled', 'true')
  }
}
