import styles from './description.module.css'

export const Description = ({ ingredients, instructions }) => {
    return (
        <div className={styles.body}>
            <p className={styles.bodyLabel}>ingredients:</p>
            <p className={styles.bodyText}>{ingredients.join(', ')}</p>
            <p className={styles.bodyLabel}>instructions:</p>
            <ol className={styles.steps}>
                {instructions.map((step) => (
                    <li key={step}>{step}</li>
                ))}
            </ol>
        </div>
    )
}
