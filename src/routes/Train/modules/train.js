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
export const getService = (Id) => injectApi({
    endpoint: api.companyService + '/getServiceList',
    method: 'get',
    body: { Id, pageSize: 100, current: 1 },
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
        console.log(payload)
        state.services = payload.entities.companyService
        state.servicePagination = payload.pagination

        return Object.assign({}, state)
    }
    // [SERVICE_CATEGORY_TAKE_LIST_SUCCESS]: (state, action) => {
    //     const { payload } = action
    //     console.log(payload)

    //     return Object.assign({}, state, {
    //         // services: payload.entities.voter,
    //         servicePagination: payload.pagination

    //     })
    // }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    services: {},
    servicePagination: { ids: [], total: 0, current: 0, pageSize: 100 }
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
