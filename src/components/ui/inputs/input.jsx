import { useId } from 'react'
import cn from 'classnames'
import styles from './input.module.css'

export const Input = ({ label, error, id, className, ...rest }) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const inputClassName = cn(styles.input, className, {
        [styles.invalid]: Boolean(error),
    })

    return (
        <div className={styles.field}>
            {label && (
                <label className={styles.label} htmlFor={inputId}>
                    {label}
                </label>
            )}
            <input id={inputId} className={inputClassName} {...rest} />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    )
}
