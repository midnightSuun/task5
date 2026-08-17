import { Link } from 'react-router'
import styles from './header.module.css'

export const Header = ({ username, onLogout }) => {
    const handleLogout = () => {
        onLogout()
    }

    return (
        <header className={styles.header}>
            <Link className={styles.logo} to="/">
                <span className={styles.badge}>🍳</span>
                Recipe Deck
            </Link>
            {username && (
                <div className={styles.userPill}>
                    <span className={styles.avatar}>
                        {username.charAt(0).toUpperCase()}
                    </span>
                    {username}
                </div>
            )}
            <button
                type="button"
                className={styles.logout}
                onClick={handleLogout}
            >
                Log out
            </button>
        </header>
    )
}
