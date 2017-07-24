import { api, injectApi, DEFAULT_FAILURE } from 'services/fetch'
import { Schema, arrayOf } from 'normalizr'

const companyServiceSchema = new Schema('companyService')

// ------------------------------------
// Constants
// ------------------------------------
export const SERVICE_CATEGORY_TAKE_LIST_REQUEST = 'SERVICE_CATEGORY_TAKE_LIST_REQUEST'
export const SERVICE_CATEGORY_TAKE_LIST_SUCCESS = 'SERVICE_CATEGORY_TAKE_LIST_SUCCESS'
export const SERVICE_CATEGORY_TAKE_LIST_FAILURE = DEFAULT_FAILURE

// ------------------------------------
// Actions
// ------------------------------------
export const getService = (topicid) => injectApi({
    endpoint: api.companyService + '/getServiceList',
    method: 'get',
    body: { CategoryId: topicid, pageSize: 100, current: 1 },
    schema: arrayOf(companyServiceSchema),
    types: [
        SERVICE_CATEGORY_TAKE_LIST_REQUEST,
        SERVICE_CATEGORY_TAKE_LIST_SUCCESS,
        SERVICE_CATEGORY_TAKE_LIST_FAILURE
    ]
})

export const actions = {
    getService
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SERVICE_CATEGORY_TAKE_LIST_SUCCESS]: (state, { payload }) => {
        state.services = payload.entities.companyService
        state.servicePagination = payload.pagination

        return Object.assign({}, state)
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    params: { id: sessionStorage.getItem('id') },
    services: {},
    servicePagination: { ids: [], total: 0, current: 0, pageSize: 100 }
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
