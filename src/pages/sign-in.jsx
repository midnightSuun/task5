import { SignInForm } from '../components/sign-in-form'

export const SignIn = () => {
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
        </div>
    )
}
