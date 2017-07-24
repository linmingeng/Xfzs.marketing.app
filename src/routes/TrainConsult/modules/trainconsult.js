import { api, injectApi, DEFAULT_FAILURE } from 'services/fetch'
import { Schema, arrayOf } from 'normalizr'

const workOrderSchema = new Schema('workOrder')
const companyServiceSchema = new Schema('companyService')
// ------------------------------------
// Constants
// ------------------------------------

export const TRAIN_CONSULT_REQUEST = 'TRAIN_CONSULT_REQUEST'
export const TRAIN_CONSULT_SUCCESS = 'TRAIN_CONSULT_SUCCESS'
export const TRAIN_CONSULT_FAILURE = DEFAULT_FAILURE

export const SERVICE_CATEGORY_TAKE_LIST_REQUEST = 'SERVICE_CATEGORY_TAKE_LIST_REQUEST'
export const SERVICE_CATEGORY_TAKE_LIST_SUCCESS = 'SERVICE_CATEGORY_TAKE_LIST_SUCCESS'
export const SERVICE_CATEGORY_TAKE_LIST_FAILURE = DEFAULT_FAILURE

// ------------------------------------
// Actions
// ------------------------------------
export const saveWorkOrder = (sa) => injectApi({
    endpoint: api.companyService + '/saveWorkOrder',
    method: 'post',
    body: sa,
    schema: workOrderSchema,
    // onSuccess,
    types: [
        TRAIN_CONSULT_REQUEST,
        TRAIN_CONSULT_SUCCESS,
        TRAIN_CONSULT_FAILURE
    ]
})

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
    saveWorkOrder,
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
    },

    [TRAIN_CONSULT_SUCCESS]: (state, { payload }) => {
        const { entities: { workOrder }, result } = payload

        state.workOrder[result] = workOrder[result]
        state.workOrderPagination.ids.push(result)

        return Object.assign({}, state)
    },

    [DEFAULT_FAILURE]: (state, action) => {
        return Object.assign({}, state, {
            error: action.payload.response.error.message
        })
    }
}

// ------------------------------------
// Reducer
// ------------------------------------

const uid = location.href.split('=')[1]
const initialState =
    {
        uid: { id: uid },
        workOrder: {},
        workOrderPagination: { ids: [] },
        params: { id: 5 },
        services: {},
        servicePagination: { ids: [], total: 0, current: 0, pageSize: 100 }
    }
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
