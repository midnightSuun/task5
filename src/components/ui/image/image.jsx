import classNames from 'classnames'
import styles from './image.module.css'

export const Image = ({
    variant = 'details',
    className,
    children,
    ...rest
}) => {
    const imageClassName =
        variant === 'card' ? styles.cardImage : styles.detailsImage

    return (
        <div className={classNames(styles.frame, styles[variant])}>
            <img
                className={classNames(styles.image, imageClassName, className)}
                {...rest}
            />
            {children}
        </div>
    )
}
