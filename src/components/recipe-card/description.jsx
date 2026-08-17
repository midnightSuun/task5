import styles from './description.module.css'

export const Description = ({ rating }) => {
    const flavorPoints = Math.round(rating * 20)

    return (
        <>
            <div className={styles.pointsTrack}>
                <div
                    className={styles.pointsFill}
                    style={{ width: `${flavorPoints}%` }}
                />
            </div>
            <div className={styles.pointsMeta}>
                <span>flavor points</span>
                <span>{flavorPoints}/100</span>
            </div>
        </>
    )
}
