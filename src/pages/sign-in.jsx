import { SignInForm } from '../components/sign-in-form'
import styles from './sign-in.module.css'

export const SignIn = () => {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.badge} aria-hidden>
                    🍳
                </div>
                <h1 className={styles.title}>Welcome back</h1>
                <p className={styles.hint}>
                    Sign in with any user from{' '}
                    <a
                        href="https://dummyjson.com/users"
                        target="_blank"
                        rel="noreferrer"
                    >
                        dummyjson.com/users
                    </a>
                    .
                    <br />
                    <span className={styles.example}>emilys / emilyspass</span>
                </p>
                <SignInForm />
            </div>
        </div>
    )
}
