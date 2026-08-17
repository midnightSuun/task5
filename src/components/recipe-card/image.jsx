import { Image } from '../ui/image'
import styles from './image.module.css'

export const RecipeCardImage = ({ src, alt, name, index, cookTimeMinutes }) => {
    return (
        <Image variant="card" src={src} alt={alt}>
            <span className={styles.index}>#{index + 1}</span>
            <span className={styles.imageTitle}>{name}</span>
            <span className={styles.time}>{cookTimeMinutes} min</span>
        </Image>
    )
}
