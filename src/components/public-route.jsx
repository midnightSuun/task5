import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'
import { selectAccessToken } from '../auth-slice'

export const PublicRoute = () => {
    const accessToken = useSelector(selectAccessToken)

    if (accessToken) {
        return <Navigate to="/" replace />
    }

    return (
        <>
            <a className="skip-link" href="#main-content">
                Skip to content
            </a>
            <main id="main-content">
                <Outlet />
            </main>
        </>
    )
}
