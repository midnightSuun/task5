import cn from 'classnames'
import styles from './button.module.css'

export const Button = ({
    variant = 'primary',
    size = 'md',
    className,
    type = 'button',
    children,
    ...rest
}) => {
    const buttonClassName = cn(
        styles.button,
        styles[variant],
        styles[size],
        className
    )

    return (
        <button className={buttonClassName} type={type} {...rest}>
            {children}
        </button>
    )
}
