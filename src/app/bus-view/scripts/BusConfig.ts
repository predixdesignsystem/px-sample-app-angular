// Resonsible for getting specifications in the Bus Configuration
// An object representing the Bus Configuration is given at instantiation.
export class BusConfig {

  static stringResources: any;
  busDef: any;
  ready: any;

  static getStringResource (key) {
    return this.stringResources[key]
  }

  constructor (busModelSpec) {
    BusConfig.stringResources = {
      'WARN_NO_BUS_CONFIG': 'Bus Configuration is undefined.',
    }

    this.busDef = null
    if (busModelSpec && busModelSpec.buses) {
      this.busDef = busModelSpec.buses[0]
    }
    this.ready = (this.busDef != null)
    if (!this.busDef) {
      console.warn(BusConfig.getStringResource('WARN_NO_BUS_CONFIG'))
    }
  }

  getBusParentAttributeName () {
    if (this.ready) {
      return this.busDef.parent
    }
    return null
  }

  getBusIdAttributeName () {
    if (this.ready) {
      return this.busDef.id
    }
    return null
  }

  getTerminalTitleFieldName (className) {
    if (this.ready) {
      for (let child of this.busDef.children) {
        if (child.type === className) {
          return child.title
        }
      }
    }
    return null
  }

  getIsMultiClass (className) {
    if (this.ready) {
      for (let child of this.busDef.children) {
        if (child.type === className && child.next) {
          return true                // code
        }
      }
    }
    return false
  }

  getTerminalLayout (className) {
    if (this.ready) {
      for (let child of this.busDef.children) {
        if (child.type === className && child.dgNodeLayout) {
          return child.dgNodeLayout
        }
      }
    }
    return null
  }

  getBusCaptionDefinition () {
    if (this.ready) {
      return this.busDef.dgCaption
    }
    return null
  }

  getBusLinkDef () {
    if (this.ready) {
      return this.busDef.dgLink
    }
    return null
  }

  getTerminalIcon (className, hasViolations) {
    if (this.ready) {
      for (let child of this.busDef.children) {
        if (child.type === className) {
          if (hasViolations && child.violatedIcon) {
            return child.violatedIcon
          } else if (child.icon) {
            return child.icon
          }
        }
      }
    }
    return null
  }

  getNavigator (className) {
    if (this.ready) {
      for (let child of this.busDef.children) {
        if (child.type === className) {
          return child.navigateTo
        }
      }
    }
    return null
  }
}
