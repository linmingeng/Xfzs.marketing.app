import { api, injectApi, fetchJson, DEFAULT_FAILURE } from 'services/fetch'
import { Schema } from 'normalizr'

const redEnvelopSchema = new Schema('redEnvelop')

// ------------------------------------
// Constants
// ------------------------------------
export const RED_ENVELOP_REQUEST = 'RED_ENVELOP_REQUEST'
export const RED_ENVELOP_SUCCESS = 'RED_ENVELOP_SUCCESS'
export const RED_ENVELOP_FAILURE = DEFAULT_FAILURE

export const RED_ENVELOP_TAKE_REQUEST = 'RED_ENVELOP_TAKE_REQUEST'
export const RED_ENVELOP_TAKE_SUCCESS = 'RED_ENVELOP_TAKE_SUCCESS'
export const RED_ENVELOP_TAKE_FAILURE = DEFAULT_FAILURE

export const RECEIVE_TAKE_RESULT_REQUEST = 'RECEIVE_TAKE_RESULT_REQUEST'
export const RECEIVE_TAKE_RESULT_SUCCESS = 'RECEIVE_TAKE_RESULT_SUCCESS'
export const RECEIVE_TAKE_RESULT_FAILURE = DEFAULT_FAILURE

// ------------------------------------
// Actions
// ------------------------------------
export const getRedEnvelop = (id) => injectApi({
    endpoint: api.redEnvelop + '/getRedEnvelop',
    method: 'get',
    body: { id },
    schema: redEnvelopSchema,
    types: [
        RED_ENVELOP_REQUEST,
        RED_ENVELOP_SUCCESS,
        RED_ENVELOP_FAILURE
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
    getRedEnvelop,
    takeRedEnvelop,
    getTakeResult
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [RED_ENVELOP_SUCCESS]: (state, { payload }) => {
        state.redEnvelop = payload.entities.redEnvelop[payload.result]
        return { ...state }
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    redEnvelop: {}
    // redEnvelopPagination: { ids: [] }
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
