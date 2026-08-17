import { Image } from '../ui/image'
import styles from './image.module.css'

export const RecipeCardImage = ({ src, alt, index }) => {
    return (
        <div className={styles.photoWrap}>
            <span className={styles.index}>#{index + 1}</span>
            <Image variant="card" src={src} alt={alt} />
        </div>
    )
}
