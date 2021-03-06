export default ({ dispatch, getState }) => next => action => {
    const requestType = action.type.slice(action.type.lastIndexOf('_') + 1)
    const state = getState()
    const loading = state.home ? state.home.loading : false

    if (requestType === 'REQUEST' && !loading) {
        dispatch({ type: 'LOADING', loading: true })
    } else if (requestType === 'SUCCESS' && loading) {
        dispatch({ type: 'LOADING', loading: false })
    } else if (requestType === 'FAILURE') {
        dispatch({ type: 'LOADING', loading: false })
    }
    return next(action)
}
