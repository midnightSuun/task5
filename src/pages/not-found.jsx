import { Link } from 'react-router'
import styles from './not-found.module.css'

export const NotFound = () => {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.badge} aria-hidden>
                    📖
                </div>
                <p className={styles.code}>404</p>
                <h1 className={styles.title}>Page not found</h1>
                <p className={styles.hint}>
                    This page is missing from the recipe book.
                </p>
                <Link className={styles.home} to="/">
                    Back to recipes
                </Link>
            </div>
        </div>
    )
}
