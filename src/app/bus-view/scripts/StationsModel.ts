export class StationsModel {

    stationsMap: any;

    constructor() {
        this.stationsMap = new Map()
    }
    getSubstations() {
        return Array.from(this.stationsMap.values())
    }
    clear() {
        this.stationsMap = new Map()
    }
    fillData(resultSet) {
        if (resultSet && resultSet['Substation']) {
            const recordsList = resultSet['Substation']
            for (let instance of recordsList) {
                let station: any = new Station(instance.ID, instance.name)
                //Object.assign(station, instance);
                this.stationsMap.set(station.ID, station)
            }
        }
    }
}

class BaseEntity {

    ID: any;
    type: any;

    constructor(id, type = '') {
        this.ID = id
        if (type) {
            this.type = type
        }
    }
}

class Station extends BaseEntity {

    name: any;

    constructor(id, name, type = '') {
        super(id, type)
        this.name = name
    }
}

class Bus extends BaseEntity {

    children: any;

    constructor(id, type) {
        super(id, type)
        this.children = new Map()
    }
}

class Terminal extends BaseEntity {

    parentID: any;

    constructor(id, type?: any, parentID?: any) {
        super(id, type)
        this.parentID = parentID
    }
}

class BranchTerminal2 extends Terminal {

    nextTerminalId: any;

    constructor(parentID, nextTerminalID) {
        super(parentID)
        this.nextTerminalId = nextTerminalID
    }
}

class BranchTerminal3 extends Terminal {

    nextTerminalID: any;
    nextNextID: any;

    constructor(parentID, nextTerminalID, nextNextId) {
        super(parentID)
        this.nextTerminalID = nextTerminalID
        this.nextNextID = nextNextId
    }
}
