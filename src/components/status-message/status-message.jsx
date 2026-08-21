import styles from './status-message.module.css'

export const StatusMessage = ({
    status = 'info',
    title,
    description,
    actionLabel,
    onAction,
}) => {
    const role = status === 'error' ? 'alert' : 'status'

    return (
        <div className={styles.box} role={role}>
            <p className={styles.title}>{title}</p>
            {description && <p className={styles.description}>{description}</p>}
            {onAction && (
                <button
                    type="button"
                    className={styles.action}
                    onClick={onAction}
                >
                    {actionLabel}
                </button>
            )}
        </div>
    )
}
