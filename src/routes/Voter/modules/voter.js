import { api, injectApi } from 'services/fetch'
import { Schema } from 'normalizr'
import { VOTING_SUCCESS } from '../../Home/modules/home'

const voterSchema = new Schema('voter')

// ------------------------------------
// Constants
// ------------------------------------
export const VOTER_DETAIL_REQUEST = 'VOTER_DETAIL_REQUEST'
export const VOTER_DETAIL_SUCCESS = 'VOTER_DETAIL_SUCCESS'
export const VOTER_DETAIL_FAILURE = 'VOTER_DETAIL_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export const getVoterDetail = (id) => injectApi({
    endpoint: api.topic + '/getVoter',
    method: 'get',
    body: { id },
    schema: voterSchema,
    types: [
        VOTER_DETAIL_REQUEST,
        VOTER_DETAIL_SUCCESS,
        VOTER_DETAIL_FAILURE
    ]
})

export const actions = {
    getVoterDetail
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [VOTER_DETAIL_SUCCESS]: (state, { payload }) => {
        const { entities: { voter }, result } = payload

        return Object.assign({}, state, voter[result])
    },

    [VOTING_SUCCESS]: (state, { payload }) => {
        state.numberOfVotes++

        return Object.assign({}, state)
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { id: '' }
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
