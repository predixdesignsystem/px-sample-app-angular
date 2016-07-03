import * as Action from './actions'

const wsmgrInitialState = {

  selectedWorkspace: undefined,
  isFetching: false,
  didInvalidate: false,
  lastUpdated: 0,
  filter: '',

  workspaces: {
//  'ws1href': { name: '' },
//  'ws2href': { name: '' }
  }
}

const workspaceManager = (state = wsmgrInitialState, action) => {
  switch (action.type) {

    case Action.WS_LIST_INVALIDATE:
      return Object.assign({}, state, {
        didInvalidate: true
      })

    case Action.WS_LIST_FILTER_CHANGE:
      return Object.assign({}, state, {
        filter: action.filter
      })

    case Action.WS_LIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })

    case Action.WS_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        // two things going on with workspace merge:
        // 1. the incoming payload is an array [{href: xxx, name: xxx}, ...],
        //    has to be reshaped as object with href as key (1st Object.assign)
        // 2. we want to keep any information already available in UI about a given workspace (2nd Object.assign)
        workspaces: Object.assign({}, ... action.payload.map(wsData => (
          { [wsData.href]: Object.assign({}, state.workspaces[wsData.href], wsData) }
        ))),
        lastUpdated: action.receivedAt
      })

    case Action.WS_LIST_FAILURE:
    case Action.WS_CREATE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })

    case Action.WS_DELETE_SUCCESS:
      return Object.assign({}, state, {
//      workspaces: state.workspaces.filter((ws) => ws.href !== action.meta),
        isFetching: false,
        didInvalidate: true
      })

    case Action.WS_DELETE_REQUEST:
    case Action.WS_MODEL_LOADFILE_REQUEST:
    case Action.WS_MODEL_QUERY_REQUEST:
    case Action.WS_CREATE_REQUEST:
    case Action.WS_RUNCOMMAND_REQUEST:
    case Action.WS_DEBUGOUTPUT_REQUEST: {
      // need to both update fetching and reduceWorkspaces ...
      // TODO: find a better way to handle this ...
      const newState = Object.assign({}, state, {
        isFetching: true
      })
      return Object.assign({}, newState, {
        workspaces: reduceWorkspaces(newState.workspaces, action)
      })
    }

    case Action.WS_CREATE_SUCCESS:
      return Object.assign({}, state, {
//      workspaces: state.workspaces.filter((ws) => ws.href !== action.meta),
        isFetching: false,
        didInvalidate: true
      })

    case Action.WS_OPEN:
      return Object.assign({}, state, {
        selectedWorkspace: action.id
      })

    case Action.WS_MODEL_QUERY_SUCCESS:
    case Action.WS_MODEL_QUERY_FAILURE:
    case Action.WS_MODEL_LOADFILE_SUCCESS:
    case Action.WS_MODEL_LOADFILE_FAILURE:
    case Action.WS_RUNCOMMAND_SUCCESS:
    case Action.WS_RUNCOMMAND_FAILURE:
    case Action.WS_DEBUGOUTPUT_SUCCESS:
    case Action.WS_DEBUGOUTPUT_FAILURE:
      // need to both update fetching and reduceWorkspaces ...
      // TODO: find a better way to handle this ...
      const newState = Object.assign({}, state, {
        isFetching: false
      })
      return Object.assign({}, newState, {
        workspaces: reduceWorkspaces(newState.workspaces, action)
      })

    default:
      return Object.assign({}, state, {
        workspaces: reduceWorkspaces(state.workspaces, action)
      })
  }
}

// TODO - switch workspaces to store by key (=wsHref)
// TODO - make sure workspace-specific actions carry wsHref

const reduceWorkspaces = (workspaces, action) => {
  // recognizes workspace-specific actions by presence of .wsHref
  const wsHref = action.wsHref || (action.meta ? action.meta.wsHref : undefined)
  if (wsHref !== undefined) {   // workspace-specific action
    return Object.assign({}, workspaces,
      { [wsHref]: reduceWorkspace(workspaces[wsHref], action) }
    )
  }

  return workspaces
}

const reduceWorkspace = (workspace, action) => {
  // TODO: change this section to not treat workspace as immutable
  switch (action.type) {
    case Action.WS_MODEL_LOADFILE_SUCCESS:
      workspace = Object.assign({}, workspace,
        { lastResult: 'File loaded successfully' }
      )
      break

    case Action.WS_MODEL_LOADFILE_FAILURE:
      workspace = Object.assign({}, workspace,
        { lastResult: 'File load failed' }
      )
      break

    case Action.WS_RUNCOMMAND_SUCCESS:
      workspace = Object.assign({}, workspace,
        { lastResult: 'Command ran successfully',
          lastCommandResponse: action.payload
       }
      )
      break

    case Action.WS_RUNCOMMAND_FAILURE:
      workspace = Object.assign({}, workspace,
        { lastResult: 'Command failed',
          lastCommandResponse: action.payload
        }
      )
      break

    case Action.WS_MODEL_QUERY_SUCCESS: {
      const { tabular } = action.meta
      workspace = Object.assign({}, workspace,
        { lastResult: 'Query successful',
          lastQueryResponse: Object.assign({}, workspace.lastQueryResponse,
            { [tabular]: action.payload })
        }
      )
    }
      break

    case Action.WS_MODEL_QUERY_FAILURE: {
      const { tabular } = action.meta
      workspace = Object.assign({}, workspace,
        { lastResult: 'Query failed' }
      )
      delete workspace.lastQueryResponse[tabular]
    }
      break

    default:
      workspace = Object.assign({}, workspace)
      delete workspace.lastResult
  }

  switch (action.type) {
    case Action.WS_MODEL_STATS_SUCCESS:
      return Object.assign({}, workspace,
        { state: action.payload }
      )

    case Action.WS_RUNCOMMAND_REQUEST:
      if (action.meta.command === 'PWRFLOW') {
        delete workspace.powerFlowConverged
      }
      return workspace

    case Action.WS_MODEL_LOADFILE_SUCCESS:
    case Action.WS_MODEL_LOADFILE_FAILURE:
    case Action.WS_RUNCOMMAND_SUCCESS:
    case Action.WS_RUNCOMMAND_FAILURE:
      const newWs = Object.assign({}, workspace)
      // use missing keys as an indication the relevant data needs to be reloaded
      delete newWs.state
      delete newWs.debugOutput
      delete newWs.lastQueryResponse  // invalidate all cached query responses

      if (action.type === Action.WS_RUNCOMMAND_SUCCESS && action.meta.command === 'PWRFLOW') {
        // look at the textual payload to determine powerflow convergence
        const converged = action.payload.text.search('Powerflow Converged') !== -1
        newWs.powerFlowConverged = converged
        newWs.lastResult = action.payload.text
      }

      return newWs

    case Action.WS_DEBUGOUTPUT_SUCCESS:
       // don't leave debugOutput undefined, will prompt repeated attempts to reload ...
      const output = action.payload || 'Can\t fetch debug output'
      return Object.assign({}, workspace,
        { debugOutput: output }
      )

    case Action.WS_NAVIGATE:
      // TODO: consider refactor + lodash.merge ...
      if (!action.className) {  // tab only switch
        return Object.assign({}, workspace,
          { currentSelection: {
            display: action.display,  // which tab is selected
            displays: workspace.currentSelection ? workspace.currentSelection.displays : {}
          }})
      } else {
        return Object.assign({}, workspace,
          { currentSelection: {
            display: action.display,  // which tab is selected
            displays: Object.assign({}, workspace.currentSelection ? workspace.currentSelection.displays : {}, {
              [action.display]: {  // selection within the tab
                className: action.className,
                fieldName: action.fieldName,
                fieldValue: action.fieldValue
              }
            })
          }})
      } /* jshint -W086 */

    default:
      return workspace
  }
}

export default workspaceManager
