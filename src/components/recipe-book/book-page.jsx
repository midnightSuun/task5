import classNames from 'classnames'
import styles from './book-page.module.css'

export const BookPage = ({ side, label, children }) => {
    return (
        <div
            className={classNames(
                styles.page,
                styles[side],
                styles.pageTurn,
            )}
        >
            <div className={styles.pageLabel}>{label}</div>
            {children}
        </div>
    )
}
