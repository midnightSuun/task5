import { useId } from 'react'
import cn from 'classnames'
import styles from './input.module.css'

export const Input = ({ label, error, id, className, ...rest }) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const inputClassName = cn(styles.input, className, {
        [styles.invalid]: Boolean(error),
    })

    const errorId = `${inputId}-error`

    return (
        <div className={styles.field}>
            {label && (
                <label className={styles.label} htmlFor={inputId}>
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={inputClassName}
                {...rest}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
            />
            {error && (
                <span id={errorId} className={styles.error}>
                    {error}
                </span>
            )}
        </div>
    )
}
