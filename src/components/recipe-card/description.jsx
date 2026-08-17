import styles from './description.module.css'

export const Description = ({ rating }) => {
    const flavorPoints = Math.min(100, Math.round((rating / 5) * 100))

    return (
        <div className={styles.pointsTrack}>
            <div
                className={styles.pointsFill}
                style={{ width: `${flavorPoints}%` }}
            />
        </div>
    )
}
