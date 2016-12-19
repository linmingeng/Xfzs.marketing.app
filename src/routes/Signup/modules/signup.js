import { api, fetchJson, injectApi, DEFAULT_FAILURE } from 'services/fetch'
import { Schema } from 'normalizr'

const singupSchema = new Schema('singup')

// ------------------------------------
// Constants
// ------------------------------------
export const SUBMIT_SINGUP_REQUEST = 'SUBMIT_SINGUP_REQUEST'
export const SUBMIT_SINGUP_SUCCESS = 'SUBMIT_SINGUP_SUCCESS'
export const SUBMIT_SIGNUP_FAILURE = DEFAULT_FAILURE

export const SINGUP_REQUEST = 'SINGUP_REQUEST'
export const SINGUP_SUCCESS = 'SINGUP_SUCCESS'
export const SINGUP_FAILURE = DEFAULT_FAILURE

// ------------------------------------
// Actions
// ------------------------------------
export const upload = (file) => fetchJson(
    api.upload,
    { data: file.data },
    'put'
)

export const submitSingup = (singup, onSuccess) => injectApi({
    endpoint: api.topic + '/singUp',
    method: 'post',
    body: singup,
    schema: singupSchema,
    types: [
        SUBMIT_SINGUP_REQUEST,
        SUBMIT_SINGUP_SUCCESS,
        SUBMIT_SIGNUP_FAILURE
    ],
    onSuccess
})

export const getSignup = (topicId) => injectApi({
    endpoint: api.topic + '/getMyVoter',
    method: 'get',
    body: { id: topicId },
    schema: singupSchema,
    types: [
        SINGUP_REQUEST,
        SINGUP_SUCCESS,
        SINGUP_FAILURE
    ]
})

export const actions = {
    upload,
    submitSingup,
    getSignup
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const defaultSingup = (state, { payload }) => {
    const { entities: { singup }, result } = payload

    return Object.assign({}, state, singup[result])
}

const ACTION_HANDLERS = {
    [SINGUP_SUCCESS]: defaultSingup,
    [SUBMIT_SINGUP_SUCCESS]: defaultSingup
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { id: '' }
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
