import { api, injectApi, DEFAULT_FAILURE } from 'services/fetch'
import { Schema } from 'normalizr'

const workOrderSchema = new Schema('workOrder')
// ------------------------------------
// Constants
// ------------------------------------

export const TRAIN_CONSULT_REQUEST = 'TRAIN_CONSULT_REQUEST'
export const TRAIN_CONSULT_SUCCESS = 'TRAIN_CONSULT_SUCCESS'
export const TRAIN_CONSULT_FAILURE = DEFAULT_FAILURE

// ------------------------------------
// Actions
// ------------------------------------
export const saveWorkOrder = (trainId, onSuccess) => injectApi({
    endpoint: api.companyService + '/saveWorkOrder',
    method: 'post',
    body: { id: trainId },
    schema: workOrderSchema,
    onSuccess,
    types: [
        TRAIN_CONSULT_REQUEST,
        TRAIN_CONSULT_SUCCESS,
        TRAIN_CONSULT_FAILURE
    ]
})
// export const saveShippingAddress = (sa) => injectApi({
//     endpoint: api.delivery + '/saveShippingAddress',
//     method: 'post',
//     body: sa,
//     schema: shippingAddressSchema,
//     types: [
//         SAVE_SHIPPING_ADDRESS_REQUEST,
//         SAVE_SHIPPING_ADDRESS_SUCCESS,
//         SAVE_SHIPPING_ADDRESS_FAILURE
//     ]
// })

export const actions = {
    saveWorkOrder
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    // [TRAIN_CONSULT_SUCCESS]: (state, { payload }) => {
    //     state.voters[payload.body.id].numberOfVotes++

    //     return Object.assign({}, state)
    // },
    [TRAIN_CONSULT_SUCCESS]: (state, { payload }) => {
        const { entities: { workOrder }, result } = payload

        state.workOrder[result] = workOrder[result]
        state.workOrderPagination.ids.push(result)

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
        workOrder: {},
        workOrderPagination: { ids: [] }
    }
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
