import { Navigate, Outlet, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../api'
import { useGetAuthUserQuery } from '../auth-api'
import { logOut, selectAccessToken } from '../auth-slice'
import { Header } from './header'

export const ProtectedRoute = () => {
    const accessToken = useSelector(selectAccessToken)
    const dispatch = useDispatch()
    const location = useLocation()
    const { data: user } = useGetAuthUserQuery(undefined, {
        skip: !accessToken,
    })

    if (!accessToken) {
        return <Navigate to="/sign-in" replace state={{ from: location }} />
    }

    const handleLogout = () => {
        dispatch(logOut())
        dispatch(api.util.resetApiState())
    }

    return (
        <div>
            <a className="skip-link" href="#main-content">
                Skip to content
            </a>
            <Header username={user?.username} onLogout={handleLogout} />
            <main id="main-content">
                <Outlet />
            </main>
        </div>
    )
}
