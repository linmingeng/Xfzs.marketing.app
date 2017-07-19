import { api, injectApi, DEFAULT_FAILURE } from 'services/fetch'
// import { Schema, arrayOf } from 'normalizr'
// ------------------------------------
// Constants
// ------------------------------------

export const TRAIN_CONSULT_REQUEST = 'TRAIN_CONSULT_REQUEST'
export const TRAIN_CONSULT_SUCCESS = 'TRAIN_CONSULT_SUCCESS'
export const TRAIN_CONSULT_FAILURE = DEFAULT_FAILURE

// ------------------------------------
// Actions
// ------------------------------------
export const voting = (trainId, onSuccess) => injectApi({
    endpoint: api.companyService + '/saveWorkOrder',
    method: 'post',
    body: { id: trainId },
    onSuccess,
    types: [
        TRAIN_CONSULT_REQUEST,
        TRAIN_CONSULT_SUCCESS,
        TRAIN_CONSULT_FAILURE
    ]
})

export const actions = {
    voting
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [TRAIN_CONSULT_SUCCESS]: (state, { payload }) => {
        state.voters[payload.body.id].numberOfVotes++

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
const initialState =
    {
        topic: {
            id: sessionStorage.getItem('id'),
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
