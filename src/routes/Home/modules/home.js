import { api, injectApi } from 'services/fetch'
import { Schema, arrayOf } from 'normalizr'

const topicSchema = new Schema('topic')
const voterSchema = new Schema('voter')

// ------------------------------------
// Constants
// ------------------------------------
export const TOPIC_INFO_REQUEST = 'TOPIC_INFO_REQUEST'
export const TOPIC_INFO_SUCCESS = 'TOPIC_INFO_SUCCESS'
export const TOPIC_INFO_FAILURE = 'TOPIC_INFO_FAILURE'

export const VOTER_LIST_REQUEST = 'VOTER_LIST_REQUEST'
export const VOTER_LIST_SUCCESS = 'VOTER_LIST_SUCCESS'
export const VOTER_LIST_FAILURE = 'VOTER_LIST_FAILURE'

export const MY_VOTER_REQUEST = 'MY_VOTER_REQUEST'
export const MY_VOTER_SUCCESS = 'MY_VOTER_SUCCESS'
export const MY_VOTER_FAILURE = 'FAILURE'

export const VOTING_REQUEST = 'VOTING_REQUEST'
export const VOTING_SUCCESS = 'VOTING_SUCCESS'
export const VOTING_FAILURE = 'FAILURE'

const LOADING = 'LOADING'
const CLEART_ERROR = 'CLEART_ERROR'
// ------------------------------------
// Actions
// ------------------------------------
export const getTopic = (topicId) => injectApi({
    endpoint: api.topic + '/getTopic',
    method: 'get',
    body: { id: topicId },
    schema: topicSchema,
    types: [
        TOPIC_INFO_REQUEST,
        TOPIC_INFO_SUCCESS,
        TOPIC_INFO_FAILURE
    ]
})

export const getMyVoter = (topicId) => injectApi({
    endpoint: api.topic + '/getMyVoter',
    method: 'get',
    body: { id: topicId },
    schema: voterSchema,
    types: [
        MY_VOTER_REQUEST,
        MY_VOTER_SUCCESS,
        MY_VOTER_FAILURE
    ]
})

export const getVoters = (topicId, order = 1) => injectApi({
    endpoint: api.topic + '/getVoterList',
    method: 'get',
    body: { topicId, pageSize: 100, current: 1, order },
    schema: arrayOf(voterSchema),
    types: [
        VOTER_LIST_REQUEST,
        VOTER_LIST_SUCCESS,
        VOTER_LIST_FAILURE
    ]
})

export const voting = (voterId, onSuccess) => injectApi({
    endpoint: api.topic + '/voting',
    method: 'post',
    body: { id: voterId },
    onSuccess,
    types: [
        VOTING_REQUEST,
        VOTING_SUCCESS,
        VOTING_FAILURE
    ]
})

export const actions = {
    getTopic,
    getVoters,
    getMyVoter,
    voting
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [LOADING]: (state, action) => Object.assign({}, state, { loading: action.loading }),

    [TOPIC_INFO_SUCCESS]: (state, { payload }) => {
        const { entities: { topic }, result } = payload

        return Object.assign({}, state, {
            topic: topic[result]
        })
    },

    [VOTER_LIST_SUCCESS]: (state, action) => {
        const { payload } = action
        return Object.assign({}, state, {
            voters: payload.entities.voter,
            voterPagination: payload.pagination
        })
    },

    [MY_VOTER_SUCCESS]: (state, { payload }) => {
        const { entities: { voter }, result } = payload

        return Object.assign({}, state, { myVoter: voter[result] })
    },

    [VOTING_SUCCESS]: (state, { payload }) => {
        state.voters[payload.body.id].numberOfVotes++

        return Object.assign({}, state)
    },

    [VOTING_FAILURE]: (state, action) => {
        return Object.assign({}, state, {
            error: action.payload.response.error.message
        })
    },

    [CLEART_ERROR]: (state, action) => {
        return Object.assign({}, state, {
            error: ''
        })
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState =
    {
        topic: {
            id: api.topicId,
            voterSum: 0,
            numberOfVoteSum: 0,
            viewSum: 0,
            voteTime: { startTime: '', endTime: '' }
        },
        voters: {},
        voterPagination: { ids: [], total: 0, current: 0, pageSize: 100 },
        myVoter: {}
    }
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
