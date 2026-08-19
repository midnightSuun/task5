import classNames from 'classnames'
import styles from './stars.module.css'

const STAR_VALUES = [1, 2, 3, 4, 5]

export const Stars = ({ rating, variant = 'gold' }) => {
    const filledStars = Math.round(rating)

    return (
        <div
            className={classNames(styles.stars, styles[variant])}
            role="img"
            aria-label={`${rating} out of 5`}
        >
            {STAR_VALUES.map((star) => (
                <span
                    key={star}
                    className={classNames({
                        [styles.starFilled]: star <= filledStars,
                        [styles.starEmpty]: star > filledStars,
                    })}
                >
                    ★
                </span>
            ))}
        </div>
    )
}
