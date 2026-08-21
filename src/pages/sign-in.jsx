import { lazy, Suspense } from 'react'
import styles from './sign-in.module.css'

const SignInForm = lazy(() =>
    import('../components/sign-in-form').then((module) => ({
        default: module.SignInForm,
    }))
)

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
                        rel="noopener noreferrer"
                    >
                        dummyjson.com/users
                    </a>
                    .
                    <br />
                    <span className={styles.example}>emilys / emilyspass</span>
                </p>
                <Suspense
                    fallback={
                        <p className={styles.hint}>Loading sign-in form…</p>
                    }
                >
                    <SignInForm />
                </Suspense>
            </div>
        </div>
    )
}
