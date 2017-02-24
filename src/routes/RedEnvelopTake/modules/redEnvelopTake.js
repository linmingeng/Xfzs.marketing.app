import { api, injectApi, fetchJson, DEFAULT_FAILURE } from 'services/fetch'
import { Schema, arrayOf } from 'normalizr'

const redEnvelopSchema = new Schema('redEnvelop')

// ------------------------------------
// Constants
// ------------------------------------
export const RED_ENVELOP_LIST_REQUEST = 'RED_ENVELOP_LIST_REQUEST'
export const RED_ENVELOP_LIST_SUCCESS = 'RED_ENVELOP_LIST_SUCCESS'
export const RED_ENVELOP_LIST_FAILURE = DEFAULT_FAILURE

export const RED_ENVELOP_TAKE_REQUEST = 'RED_ENVELOP_TAKE_REQUEST'
export const RED_ENVELOP_TAKE_SUCCESS = 'RED_ENVELOP_TAKE_SUCCESS'
export const RED_ENVELOP_TAKE_FAILURE = DEFAULT_FAILURE

export const RECEIVE_TAKE_RESULT_REQUEST = 'RECEIVE_TAKE_RESULT_REQUEST'
export const RECEIVE_TAKE_RESULT_SUCCESS = 'RECEIVE_TAKE_RESULT_SUCCESS'
export const RECEIVE_TAKE_RESULT_FAILURE = DEFAULT_FAILURE

// ------------------------------------
// Actions
// ------------------------------------
export const getCanTakeRedEnvelopList = (id) => injectApi({
    endpoint: api.redEnvelop + '/getCanTakeRedEnvelopList',
    method: 'get',
    body: { id },
    schema: arrayOf(redEnvelopSchema),
    types: [
        RED_ENVELOP_LIST_REQUEST,
        RED_ENVELOP_LIST_SUCCESS,
        RED_ENVELOP_LIST_FAILURE
    ]
})

export const takeRedEnvelop = (id, onSuccess) => injectApi({
    endpoint: api.redEnvelopQueue,
    method: 'post',
    body: { redEnvelopId: id },
    onSuccess,
    types: [
        RED_ENVELOP_TAKE_REQUEST,
        RED_ENVELOP_TAKE_SUCCESS,
        RED_ENVELOP_TAKE_FAILURE
    ]
})

export const getTakeResult = (redEnvelopId, takeId, onSuccess) => injectApi({
    endpoint: api.redEnvelop + '/getTakeingResult',
    method: 'get',
    body: { redEnvelopId, takeId },
    onSuccess,
    types: [
        RECEIVE_TAKE_RESULT_REQUEST,
        RECEIVE_TAKE_RESULT_SUCCESS,
        RECEIVE_TAKE_RESULT_FAILURE
    ]
})

export const getShareCode = (data) => fetchJson(
    api.redEnvelop + '/getShareCode',
    data,
    'get')

export const trySaveShareRecords = (data) => fetchJson(
    api.redEnvelop + '/saveShareRecords',
    data,
    'post')

export const actions = {
    getCanTakeRedEnvelopList,
    takeRedEnvelop,
    getTakeResult
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [RED_ENVELOP_LIST_SUCCESS]: (state, { payload }) => {
        state.redEnvelop = payload.entities.redEnvelop
        state.redEnvelopPagination = payload.pagination

        return Object.assign({}, state)
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    redEnvelop: {},
    redEnvelopPagination: { ids: [] }
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
