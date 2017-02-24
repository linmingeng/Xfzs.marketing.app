import { api, injectApi, DEFAULT_FAILURE } from 'services/fetch'
import { Schema, arrayOf } from 'normalizr'

const redEnvelopTakeRecordSchema = new Schema('takeRecord')

// ------------------------------------
// Constants
// ------------------------------------
export const RED_ENVELOP_TAKE_LIST_REQUEST = 'RED_ENVELOP_TAKE_LIST_REQUEST'
export const RED_ENVELOP_TAKE_LIST_SUCCESS = 'RED_ENVELOP_TAKE_LIST_SUCCESS'
export const RED_ENVELOP_TAKE_LIST_FAILURE = DEFAULT_FAILURE

// ------------------------------------
// Actions
// ------------------------------------
export const getMyTakeRecordList = (id) => injectApi({
    endpoint: api.redEnvelop + '/getMyTakeRecordList',
    method: 'get',
    body: { id },
    schema: arrayOf(redEnvelopTakeRecordSchema),
    types: [
        RED_ENVELOP_TAKE_LIST_REQUEST,
        RED_ENVELOP_TAKE_LIST_SUCCESS,
        RED_ENVELOP_TAKE_LIST_FAILURE
    ]
})

export const actions = {
    getMyTakeRecordList
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [RED_ENVELOP_TAKE_LIST_SUCCESS]: (state, { payload }) => {
        state.takeRecord = payload.entities.takeRecord
        state.takeRecordPagination = payload.pagination

        return Object.assign({}, state)
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    takeRecord: {},
    takeRecordPagination: { ids: [] }
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
