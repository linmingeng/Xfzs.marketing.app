import { api, injectApi, DEFAULT_FAILURE } from 'services/fetch'
import { Schema } from 'normalizr'

const trainGetServiceCategorySchema = new Schema('getServiceCategory')

// ------------------------------------
// Constants
// ------------------------------------
export const SERVICE_CATEGORY_TAKE_LIST_REQUEST = 'SERVICE_CATEGORY_TAKE_LIST_REQUEST'
export const SERVICE_CATEGORY_TAKE_LIST_SUCCESS = 'SERVICE_CATEGORY_TAKE_LIST_SUCCESS'
export const SERVICE_CATEGORY_TAKE_LIST_FAILURE = DEFAULT_FAILURE

// ------------------------------------
// Actions
// ------------------------------------
export const getServiceCategoryList = (id) => injectApi({
    endpoint: api.companyService + '/getServiceCategoryList',
    method: 'get',
    schema: trainGetServiceCategorySchema,
    types: [
        SERVICE_CATEGORY_TAKE_LIST_REQUEST,
        SERVICE_CATEGORY_TAKE_LIST_SUCCESS,
        SERVICE_CATEGORY_TAKE_LIST_FAILURE
    ]
})

export const actions = {
    getServiceCategoryList
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SERVICE_CATEGORY_TAKE_LIST_SUCCESS]: (state, { payload }) => {
        state.getServiceCategory = payload.entities.getServiceCategory
        state.getServiceCategory = payload.pagination

        return Object.assign({}, state)
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    getServiceCategory: {},
    getServiceCategoryPagination: { ids: [] }
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
