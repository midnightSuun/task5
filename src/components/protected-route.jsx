import { Link, Navigate, Outlet, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../api'
import { useGetAuthUserQuery } from '../auth-api'
import { logOut, selectAccessToken } from '../auth-slice'
import { Button } from './ui/button'

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
            <header>
                <Link to="/">Recipes</Link>
                {user?.username && <span>{user.username}</span>}
                <Button type="button" variant="secondary" size="sm" onClick={handleLogout}>
                    Log out
                </Button>
            </header>
            <Outlet />
        </div>
    )
}
