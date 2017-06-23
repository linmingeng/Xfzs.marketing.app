import { api, injectApi } from 'services/fetch'

// const ACTION_HANDLERS = {
//     [RED_ENVELOP_SUCCESS]: (state, { payload }) => {
//         state.redEnvelop = payload.entities.redEnvelop[payload.result]
//         return { ...state }
//     }
// }

// const initialState = {
//     // redEnvelop: {}
//     // redEnvelopPagination: { ids: [] }
// }
// export default function counterReducer(state = initialState, action) {
//     const handler = ACTION_HANDLERS[action.type]

//     return handler ? handler(state, action) : state
// }