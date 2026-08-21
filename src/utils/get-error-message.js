export const getErrorMessage = (error) => {
    if (!error) return 'Something went wrong. Please try again.'

    if (typeof error === 'string') return error

    if (error.status === 'FETCH_ERROR') {
        return 'Network error. Check your connection and try again.'
    }

    if (error.status === 'TIMEOUT_ERROR') {
        return 'The request timed out. Please try again.'
    }

    if (error.status === 401) {
        return 'Session expired. Please sign in again.'
    }

    if (error.status === 404) {
        return 'This recipe is not in the book.'
    }

    return error.data?.message || `Request failed (${error.status})`
}
