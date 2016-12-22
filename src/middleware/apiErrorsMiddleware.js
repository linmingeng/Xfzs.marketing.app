import auth from '../services/auth'

export default ({ dispatch, getState }) => next => action => {
    if (action.type === 'FAILURE') {
        if (action.payload.status === 401) {
            auth.login()
            return
        }
    }

    const requestType = action.type.slice(action.type.lastIndexOf('_') + 1)
    if (requestType === 'FAILURE') {
        setTimeout(() => {
            dispatch({ type: 'CLEART_ERROR' })
        }, 1500)
    }

    return next(action)
}
