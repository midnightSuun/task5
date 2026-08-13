import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useLoginMutation } from '../auth-api'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/inputs'

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
            <form onSubmit={handleSubmit}>
                <Input
                    id="username"
                    name="username"
                    type="text"
                    label="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                />
                <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
            </form>
            {isError && <p>Error: {error?.data?.message || error.status}</p>}
        </div>
    )
}
