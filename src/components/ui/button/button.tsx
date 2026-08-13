import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
    size?: ButtonSize
}

export const Button = ({
    variant = 'primary',
    size = 'md',
    className,
    type = 'button',
    children,
    ...rest
}: ButtonProps) => {
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
