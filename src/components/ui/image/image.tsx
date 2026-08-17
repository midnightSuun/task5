import { ImgHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import styles from './image.module.css'

type ImageVariant = 'card' | 'details'

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
    variant?: ImageVariant
    children?: ReactNode
}

export const Image = ({
    variant = 'details',
    className,
    children,
    ...rest
}: ImageProps) => {
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
