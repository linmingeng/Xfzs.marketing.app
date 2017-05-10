import { api, injectApi, DEFAULT_FAILURE } from 'services/fetch'
import { Schema, arrayOf } from 'normalizr'
import { RECEIVE_TAKE_RESULT_SUCCESS } from '../../RedEnvelopTake/modules/redEnvelopTake'

const redEnvelopSchema = new Schema('redEnvelop')
const redEnvelopTopicSchema = new Schema('redEnvelopTopic')

// ------------------------------------
// Constants
// ------------------------------------
export const RED_ENVELOP_TOPIC_REQUEST = 'RED_ENVELOP_TOPIC_REQUEST'
export const RED_ENVELOP_TOPIC_SUCCESS = 'RED_ENVELOP_TOPIC_SUCCESS'
export const RED_ENVELOP_TOPIC_FAILURE = DEFAULT_FAILURE

export const RED_ENVELOP_LIST_REQUEST = 'RED_ENVELOP_LIST_REQUEST'
export const RED_ENVELOP_LIST_SUCCESS = 'RED_ENVELOP_LIST_SUCCESS'
export const RED_ENVELOP_LIST_FAILURE = DEFAULT_FAILURE

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

export const getRedEnvelopTopic = (id) => injectApi({
    endpoint: api.redEnvelop + '/getTopic',
    method: 'get',
    body: { id },
    schema: arrayOf(redEnvelopTopicSchema),
    types: [
        RED_ENVELOP_TOPIC_REQUEST,
        RED_ENVELOP_TOPIC_SUCCESS,
        RED_ENVELOP_TOPIC_FAILURE
    ]
})

export const actions = {
    getRedEnvelopTopic,
    getCanTakeRedEnvelopList
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [RED_ENVELOP_LIST_SUCCESS]: (state, { payload }) => {
        state.redEnvelops = payload.entities.redEnvelop
        state.redEnvelopsPagination = payload.pagination

        return Object.assign({}, state)
    },

    [RED_ENVELOP_TOPIC_SUCCESS]: (state, { payload }) => {
        state.topic = payload.result

        return Object.assign({}, state)
    },

    [RECEIVE_TAKE_RESULT_SUCCESS]: (state, { payload }) => {
        if (payload.json.result.status === 1) {
            state.topic.currentUserCanReceiveTimes--

            return Object.assign({}, state)
        }

        return state
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    topic: {},
    redEnvelops: {},
    redEnvelopsPagination: { ids: [] }
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
