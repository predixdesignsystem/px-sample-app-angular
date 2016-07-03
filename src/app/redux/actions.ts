// import { CALL_API } from 'redux-api-middleware'
// TypeScript appears to not be able yet to import untyped JS modules, so require instead
declare var require: (moduleId: string) => any;
const apiMiddleware = require('redux-api-middleware');
const { CALL_API } = apiMiddleware;

// API actions

export const WS_LIST_REQUEST = 'WS_LIST_REQUEST'
export const WS_LIST_SUCCESS = 'WS_LIST_SUCCESS'
export const WS_LIST_FAILURE = 'WS_LIST_FALURE'

export const WS_CREATE_REQUEST = 'WS_CREATE_REQUEST'
export const WS_CREATE_SUCCESS = 'WS_CREATE_SUCCESS'
export const WS_CREATE_FAILURE = 'WS_CREATE_FAILURE'

export const WS_DELETE_REQUEST = 'WS_DELETE_REQUEST'
export const WS_DELETE_SUCCESS = 'WS_DELETE_SUCCESS'
export const WS_DELETE_FAILURE = 'WS_DELETE_FAILURE'

export const WS_MODEL_STATS_REQUEST = 'WS_MODEL_STATS_REQUEST'
export const WS_MODEL_STATS_SUCCESS = 'WS_MODEL_STATS_SUCCESS'
export const WS_MODEL_STATS_FAILURE = 'WS_MODEL_STATS_FAILURE'

export const WS_MODEL_LOADFILE_REQUEST = 'WS_MODEL_LOADFILE_REQUEST'
export const WS_MODEL_LOADFILE_SUCCESS = 'WS_MODEL_LOADFILE_SUCCESS'
export const WS_MODEL_LOADFILE_FAILURE = 'WS_MODEL_LOADFILE_FAILURE'

export const WS_MODEL_QUERY_REQUEST = 'WS_MODEL_QUERY_REQUEST'
export const WS_MODEL_QUERY_SUCCESS = 'WS_MODEL_QUERY_SUCCESS'
export const WS_MODEL_QUERY_FAILURE = 'WS_MODEL_QUERY_FAILURE'

export const WS_RUNCOMMAND_REQUEST = 'WS_RUNCOMMAND_REQUEST'
export const WS_RUNCOMMAND_SUCCESS = 'WS_RUNCOMMAND_SUCCESS'
export const WS_RUNCOMMAND_FAILURE = 'WS_RUNCOMMAND_FAILURE'

export const WS_DEBUGOUTPUT_REQUEST = 'WS_DEBUGOUTPUT_REQUEST'
export const WS_DEBUGOUTPUT_SUCCESS = 'WS_DEBUGOUTPUT_SUCCESS'
export const WS_DEBUGOUTPUT_FAILURE = 'WS_DEBUGOUTPUT_FAILURE'

// UI actions

export const WS_OPEN = 'WS_OPEN'
export const WS_LIST_INVALIDATE = 'WS_LIST_INVALIDATE'
export const WS_LIST_FILTER_CHANGE = 'WS_LIST_FITLER_CHANGE'
export const WS_NAVIGATE = 'WS_NAVIGATE'

export const openWorkspace = (workspaceHref) => {
  return {
    type: WS_OPEN,
    wsHref: workspaceHref
  }
}

export const invalidateWorkspaceList = () => {
  return {
    type: WS_LIST_INVALIDATE
  }
}

export const wsListFilterChange = (filter) => {
  return {
    type: WS_LIST_FILTER_CHANGE,
    filter: filter
  }
}
function endpoint (segment) {
  return (state) => {
    // TODO: hardcoded for now
    const API_ROOT = 'https://localhost:8388/wsmgr'
    return API_ROOT + segment
  }
}

// merge authorization header into request
const withAuth = (request) => {
  return Object.assign({}, request, {
    headers: Object.assign({}, request.headers, { 'Authorization': 'Basic ' + btoa('testuser:testpassword') })
  })
}

const appendedResourceParam = (resourceSet) => {
  // Calling it "appended..." to show indicate an "&" will be prepended.
  return resourceSet ? `&resset=${resourceSet}` : ''
}

export function fetchWorkspaceList () {
  return {
    [CALL_API]: withAuth({
      endpoint: endpoint('/workspaces'),
      method: 'GET',
      types: [ WS_LIST_REQUEST, WS_LIST_SUCCESS, WS_LIST_FAILURE ]
    })
  }
}

export function createWorkspace (wsName) {
  return {
    [CALL_API]: withAuth({
      endpoint: endpoint(wsName ? `/workspaces?name=${wsName}` : '/workspaces'),
      method: 'POST',
      types: [ WS_CREATE_REQUEST, WS_CREATE_SUCCESS, WS_CREATE_FAILURE ]
    })
  }
}

// all workspace-specific actions carry meta: { wsHref: href }

export function getWorkspaceModelStats (workspaceHref) {
  return {
    [CALL_API]: withAuth({
      endpoint: `${workspaceHref}/model/stats`,
      method: 'GET',
      types: [
        WS_MODEL_STATS_REQUEST,
        { type: WS_MODEL_STATS_SUCCESS,
          meta: { wsHref: workspaceHref }
        },
        WS_MODEL_STATS_FAILURE ]
    })
  }
}

export function executeQuery (workspaceHref, query, resourceSet, tabular) {
  return {
    [CALL_API]: withAuth({
      endpoint: `${workspaceHref}/model/queries?query=${query}${appendedResourceParam(resourceSet)}`,
      method: 'POST',
      types: [
        WS_MODEL_QUERY_REQUEST,
        { type: WS_MODEL_QUERY_SUCCESS,
          meta: { wsHref: workspaceHref,
                  tabular
                }
        },
        { type: WS_MODEL_QUERY_FAILURE,
          meta: { wsHref: workspaceHref,
                  tabular
                 }
        }
      ]
    })
  }
}

export function loadFile (workspaceHref, fileName) {
  return {
    [CALL_API]: withAuth({
      endpoint: `${workspaceHref}/model/resources?file=${fileName}`,
      method: 'POST',
      types: [
        WS_MODEL_LOADFILE_REQUEST,
        { type: WS_MODEL_LOADFILE_SUCCESS,
          meta: { wsHref: workspaceHref }
        },
        { type: WS_MODEL_LOADFILE_FAILURE,
          meta: { wsHref: workspaceHref }
        }
      ]
    })
  }
}

export function runCommand (workspaceHref, command, param, file, marker, paramMap) {
  const qParam = param !== undefined ? `&param=${encodeURIComponent(param)}` : ''
  const qFile = file !== undefined ? `&file=${encodeURIComponent(file)}` : ''
  const qMarker = marker !== undefined ? `&marker=${encodeURIComponent(marker)}` : ''

  var qParamMap = ''
  if (paramMap !== undefined) {
    qParamMap = paramMap.map(
      pkv => `&${encodeURIComponent(pkv.param)}=${encodeURIComponent(pkv.value)}`
    ).join('')
  }

  return {
    [CALL_API]: withAuth({
      endpoint: `${workspaceHref}/commands?command=${encodeURIComponent(command)}` +
        qParam + qFile + qMarker + qParamMap,
      method: 'POST',
      headers: { 'Content-type': 'text/plain' },
      body: '{}', // server currently requires empty body to process the request (TODO: check on why ...)
      types: [
        { type: WS_RUNCOMMAND_REQUEST,
          meta: { wsHref: workspaceHref, command }
        },
        { type: WS_RUNCOMMAND_SUCCESS,
          meta: { wsHref: workspaceHref, command },
          payload: extractTextPlainPayload
        },
        { type: WS_RUNCOMMAND_FAILURE,
          meta: { wsHref: workspaceHref, command },
          payload: extractTextPlainPayload
        }
      ]
    })
  }
}

export function getDebugOutput (workspaceHref) {
  return {
    [CALL_API]: withAuth({
      endpoint: `${workspaceHref}/debug/process`,
      method: 'GET',
      types: [
        WS_DEBUGOUTPUT_REQUEST,
        { type: WS_DEBUGOUTPUT_SUCCESS,
          meta: { wsHref: workspaceHref },
          payload: extractTextPlainPayload
        },
        WS_DEBUGOUTPUT_FAILURE
      ]
    })
  }
}

// expect the full href of the workspace
export function deleteWorkspace (workspaceHref) {
  return {
    [CALL_API]: withAuth({
      endpoint: workspaceHref,
      method: 'DELETE',
      types: [
        WS_DELETE_REQUEST,
        { type: WS_DELETE_SUCCESS,
          meta: workspaceHref      // keep href, as delete response does not provide it
        },
        WS_DELETE_FAILURE]
    })
  }
}

function shouldFetchWorkspaceList (state) {
  if (!state.workspaces) {
    return true
  } else if (state.isFetching) {
    return false
  } else {
    return state.didInvalidate
  }
}

export function fetchWorkspaceListIfNeeded () {
  return (dispatch, getState) => {
    if (shouldFetchWorkspaceList(getState())) {
      return dispatch(fetchWorkspaceList())
    }
  }
}

/*
  Some of our API call return text/plain. The middleware API we are using
  needs help extracting it. 'response' here is Fetch API Response
  (https://developer.mozilla.org/en-US/docs/Web/API/Response)
*/
const extractTextPlainPayload = (action, state, response) => {
  const contentType = response.headers.get('Content-Type')
  if (contentType && ~contentType.indexOf('text/plain')) {
    return response.text()
      .then(value => ({text: value}))
  }
}

export const navigate = (workspaceHref, newSelection) => (
  Object.assign({
    type: WS_NAVIGATE,
    wsHref: workspaceHref
  }, newSelection)
)
