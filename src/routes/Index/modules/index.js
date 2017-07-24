import { api, injectApi, DEFAULT_FAILURE } from 'services/fetch'
import { Schema, arrayOf } from 'normalizr'

const serviceCategorySchema = new Schema('serviceCategory')

// ------------------------------------
// Constants
// ------------------------------------
export const SERVICE_CATEGORY_LIST_REQUEST = 'SERVICE_CATEGORY_LIST_REQUEST'
export const SERVICE_CATEGORY_LIST_SUCCESS = 'SERVICE_CATEGORY_LIST_SUCCESS'
export const SERVICE_CATEGORY_LIST_FAILURE = DEFAULT_FAILURE

// ------------------------------------
// Actions
// ------------------------------------
export const getServiceCategory = () => injectApi({
    endpoint: api.companyService + '/getServiceCategoryList',
    method: 'get',
    schema: arrayOf(serviceCategorySchema),
    types: [
        SERVICE_CATEGORY_LIST_REQUEST,
        SERVICE_CATEGORY_LIST_SUCCESS,
        SERVICE_CATEGORY_LIST_FAILURE
    ]
})

export const actions = {
    getServiceCategory
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SERVICE_CATEGORY_LIST_SUCCESS]: (state, { payload }) => {
        // console.log(payload)
        return Object.assign({}, state, {
            serviceCategorys: payload.entities.serviceCategory,
            servicePagination: payload.result
        })
    }
    // [SERVICE_CATEGORY_LIST_SUCCESS]: (state, { payload }) => {
    //     state.serviceCategorys = payload.entities.serviceCategory
    //     state.servicePagination = payload.result
    //     console.log(state.servicePagination)
    //     return Object.assign({}, state)
    // }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    serviceCategorys: {},
    servicePagination: []
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
