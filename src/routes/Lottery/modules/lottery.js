
import { api, injectApi, DEFAULT_FAILURE } from 'services/fetch'
import { Schema, arrayOf } from 'normalizr'

const prodcutSchema = new Schema('product')
const userWalletSchema = new Schema('userWallet')
const drawRecordSchema = new Schema('drawRecord')
const shippingAddressSchema = new Schema('shippingAddress')

// ------------------------------------
// Constants
// ------------------------------------
export const PRODCUT_LIST_REQUEST = 'PRODCUT_LIST_REQUEST'
export const PRODCUT_LIST_SUCCESS = 'PRODCUT_LIST_SUCCESS'
export const PRODCUT_LIST_FAILURE = DEFAULT_FAILURE

export const USER_WALLET_REQUEST = 'USER_WALLET_REQUEST'
export const USER_WALLET_SUCCESS = 'USER_WALLET_SUCCESS'
export const USER_WALLET_FAILURE = DEFAULT_FAILURE

export const DRAW_REQUEST = 'DRAW_REQUEST_NOT'
export const DRAW_SUCCESS = 'DRAW_SUCCESS_NOT'
export const DRAW_FAILURE = DEFAULT_FAILURE

export const ADD_USER_WALLET_POINTS = 'ADD_USER_WALLET_POINTS'

export const DRAW_RECORDS_LIST_REQUEST = 'DRAW_RECORDS_LIST_REQUEST_NOT'
export const DRAW_RECORDS_LIST_SUCCESS = 'DRAW_RECORDS_LIST_SUCCESS_NOT'
export const DRAW_RECORDS_LIST_FAILURE = DEFAULT_FAILURE

export const USER_DRAW_RECORDS_LIST_REQUEST = 'USER_DRAW_RECORDS_LIST_REQUEST'
export const USER_DRAW_RECORDS_LIST_SUCCESS = 'USER_DRAW_RECORDS_LIST_SUCCESS'
export const USER_DRAW_RECORDS_LIST_FAILURE = DEFAULT_FAILURE

export const SHIPPING_ADDRESS_LIST_REQUEST = 'SHIPPING_ADDRESS_LIST_REQUEST'
export const SHIPPING_ADDRESS_LIST_SUCCESS = 'SHIPPING_ADDRESS_LIST_SUCCESS'
export const SHIPPING_ADDRESS_LIST_FAILURE = DEFAULT_FAILURE

export const SAVE_SHIPPING_ADDRESS_REQUEST = 'SAVE_SHIPPING_ADDRESS_REQUEST'
export const SAVE_SHIPPING_ADDRESS_SUCCESS = 'SAVE_SHIPPING_ADDRESS_SUCCESS'
export const SAVE_SHIPPING_ADDRESS_FAILURE = DEFAULT_FAILURE

export const SET_SHIPPING_ADDRESS_REQUEST = 'SET_SHIPPING_ADDRESS_REQUEST'
export const SET_SHIPPING_ADDRESS_SUCCESS = 'SET_SHIPPING_ADDRESS_SUCCESS'
export const SET_SHIPPING_ADDRESS_FAILURE = DEFAULT_FAILURE

// ------------------------------------
// Actions
// ------------------------------------
export const getProducts = (lotteryId) => injectApi({
    endpoint: api.lottery + '/getProductList',
    method: 'get',
    body: { id: lotteryId },
    schema: arrayOf(prodcutSchema),
    types: [
        PRODCUT_LIST_REQUEST,
        PRODCUT_LIST_SUCCESS,
        PRODCUT_LIST_FAILURE
    ]
})

export const getWallet = () => injectApi({
    endpoint: api.order + '/getCurrentUserWallet',
    method: 'get',
    schema: userWalletSchema,
    types: [
        USER_WALLET_REQUEST,
        USER_WALLET_SUCCESS,
        USER_WALLET_FAILURE
    ]
})

export const draw = (id, onSuccess) => injectApi({
    endpoint: api.lottery + '/draw',
    method: 'post',
    body: { id },
    schema: drawRecordSchema,
    types: [
        DRAW_REQUEST,
        DRAW_SUCCESS,
        DRAW_FAILURE
    ],
    onSuccess
})

export const addPoints = (points) => {
    return {
        type: ADD_USER_WALLET_POINTS,
        points: points
    }
}

export const getGlobalDrawRecords = (id) => injectApi({
    endpoint: api.lottery + '/getLotteryecords',
    method: 'get',
    body: { id, pageSize: 5, current: 1, isWinning: true },
    schema: arrayOf(drawRecordSchema),
    types: [
        DRAW_RECORDS_LIST_REQUEST,
        DRAW_RECORDS_LIST_SUCCESS,
        DRAW_RECORDS_LIST_FAILURE
    ]
})

export const getUserDrawRecords = (id) => injectApi({
    endpoint: api.lottery + '/getLotteryecords',
    method: 'get',
    body: { id, pageSize: 50, current: 1, isWinning: true, isSelf: true },
    schema: arrayOf(drawRecordSchema),
    types: [
        USER_DRAW_RECORDS_LIST_REQUEST,
        USER_DRAW_RECORDS_LIST_SUCCESS,
        USER_DRAW_RECORDS_LIST_FAILURE
    ]
})

export const getShippingAddress = () => injectApi({
    endpoint: api.delivery + '/getShippingAddressList',
    method: 'get',
    schema: arrayOf(shippingAddressSchema),
    types: [
        SHIPPING_ADDRESS_LIST_REQUEST,
        SHIPPING_ADDRESS_LIST_SUCCESS,
        SHIPPING_ADDRESS_LIST_FAILURE
    ]
})

export const saveShippingAddress = (sa) => injectApi({
    endpoint: api.delivery + '/saveShippingAddress',
    method: 'post',
    body: sa,
    schema: shippingAddressSchema,
    types: [
        SAVE_SHIPPING_ADDRESS_REQUEST,
        SAVE_SHIPPING_ADDRESS_SUCCESS,
        SAVE_SHIPPING_ADDRESS_FAILURE
    ]
})

export const setShippingAddress = (lotteryRecordId, shippingAddressId) => injectApi({
    endpoint: api.lottery + '/SetShippingAddress',
    method: 'post',
    body: { id: lotteryRecordId, shippingAddressId },
    types: [
        SET_SHIPPING_ADDRESS_REQUEST,
        SET_SHIPPING_ADDRESS_SUCCESS,
        SET_SHIPPING_ADDRESS_FAILURE
    ]
})

export const actions = {
    getProducts,
    getWallet,
    draw,
    addPoints,
    getGlobalDrawRecords,
    getUserDrawRecords,
    getShippingAddress,
    saveShippingAddress,
    setShippingAddress
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [PRODCUT_LIST_SUCCESS]: (state, { payload }) => {
        state.products = payload.entities.product
        state.productsPagination = payload.pagination

        return Object.assign({}, state)
    },

    [USER_WALLET_SUCCESS]: (state, { payload }) => {
        const { entities: { userWallet }, result } = payload

        state.userWallet = userWallet[result]

        return Object.assign({}, state)
    },

    [DRAW_SUCCESS]: (state, { payload }) => {
        const { entities: { drawRecord }, result } = payload
        const dr = drawRecord[result]
        state.drawRecords[result] = drawRecord[result]
        state.userDrawRecordPagination.ids.push(result)

        state.userWallet.points -= dr.payPoints

        return Object.assign({}, state)
    },

    [ADD_USER_WALLET_POINTS]: (state, action) => {
        state.userWallet.points += action.points

        return Object.assign({}, state)
    },

    [DRAW_RECORDS_LIST_SUCCESS]: (state, { payload }) => {
        const { entities: { drawRecord }, pagination } = payload

        state.drawRecords = Object.assign(state.drawRecords, drawRecord)
        state.gloablDrawRecordPagination = pagination

        return Object.assign({}, state)
    },

    [USER_DRAW_RECORDS_LIST_SUCCESS]: (state, { payload }) => {
        const { entities: { drawRecord }, pagination } = payload

        state.drawRecords = Object.assign(state.drawRecords, drawRecord)
        state.userDrawRecordPagination = pagination

        return Object.assign({}, state)
    },

    [SHIPPING_ADDRESS_LIST_SUCCESS]: (state, { payload }) => {
        state.shippingAddress = payload.entities.shippingAddress
        state.shippingAddressPagination = { ids: payload.result }

        return Object.assign({}, state)
    },

    [SAVE_SHIPPING_ADDRESS_SUCCESS]: (state, { payload }) => {
        const { entities: { shippingAddress }, result } = payload

        state.shippingAddress[result] = shippingAddress[result]
        state.shippingAddressPagination.ids.push(result)

        return Object.assign({}, state)
    },

    [SET_SHIPPING_ADDRESS_SUCCESS]: (state, { payload }) => {
        state.drawRecords[payload.body.id].shippingAddress = payload.body.shippingAddressId

        return Object.assign({}, state)
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    products: [],
    productsPagination: { ids: [] },
    userWallet: {},
    drawRecords: {},
    shippingAddress: {},
    userDrawRecordPagination: { ids: [] },
    gloablDrawRecordPagination: { ids: [] },
    shippingAddressPagination: { ids: [] }
}
export default function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
