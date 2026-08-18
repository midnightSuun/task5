import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useLoginMutation } from '../auth-api'
import { SignInForm } from '../components/sign-in-form'

export const SignIn = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, { isLoading, isError, error }] = useLoginMutation()
    const navigate = useNavigate()
    const location = useLocation()

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await login({ username, password }).unwrap()
            const from = location.state?.from?.pathname || '/'
            navigate(from, { replace: true })
        } catch {
            // error is rendered from the mutation state
        }
    }

    return (
        <div>
            <h1>Sign in</h1>
            <p>
                Use the username and password of any user from{' '}
                <a
                    href="https://dummyjson.com/users"
                    target="_blank"
                    rel="noreferrer"
                >
                    dummyjson.com/users
                </a>
                . For example: emilys / emilyspass
            </p>
            <SignInForm />
            {isError && <p>Error: {error?.data?.message || error.status}</p>}
        </div>
    )
}
