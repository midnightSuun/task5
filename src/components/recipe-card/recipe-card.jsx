import { Link } from 'react-router'
import { Stars } from '../ui/stars'
import { Description } from './description'
import { RecipeCardImage } from './image'
import styles from './recipe-card.module.css'

export const RecipeCard = ({ recipe, index }) => {
    return (
        <article className={styles.card}>
            <Link className={styles.link} to={`/recipes/${recipe.id}`}>
                <RecipeCardImage
                    src={recipe.image}
                    alt={recipe.name}
                    index={index}
                />
                <div className={styles.body}>
                    <h3 className={styles.name}>{recipe.name}</h3>
                    <div className={styles.metaRow}>
                        <span className={styles.cuisine}>{recipe.cuisine}</span>
                        <span className={styles.time}>
                            {recipe.cookTimeMinutes}m
                        </span>
                        <Stars rating={recipe.rating} />
                    </div>
                    <Description rating={recipe.rating} />
                </div>
            </Link>
        </article>
    )
}
