import { api, injectApi, DEFAULT_FAILURE } from 'services/fetch'
import { Schema } from 'normalizr'

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
export const getServiceCategoryList = () => injectApi({
    endpoint: api.companyService + '/getServiceCategoryList',
    method: 'get',
    schema: serviceCategorySchema,
    types: [
        SERVICE_CATEGORY_LIST_REQUEST,
        SERVICE_CATEGORY_LIST_SUCCESS,
        SERVICE_CATEGORY_LIST_FAILURE
    ]
})

export const actions = {
    getServiceCategoryList
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SERVICE_CATEGORY_LIST_SUCCESS]: (state, { payload }) => {
        const { entities: { serviceCategory }, result } = payload
        console.log(111)
        // console.log(payload)

        return Object.assign({}, state, serviceCategory[result])
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState =
    {
        serviceCategory: {},
        serviceCategoryPagination: { ids: [], total: 0, current: 0, pageSize: 10 }
    }
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
