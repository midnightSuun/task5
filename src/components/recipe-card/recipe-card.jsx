import { Link } from 'react-router'
import { Stars } from '../ui/stars'
import { Description } from './description'
import { RecipeCardImage } from './image'
import styles from './recipe-card.module.css'

export const RecipeCard = ({ recipe, index }) => {
    return (
        <article className={styles.card}>
            <Link className={styles.link} to={`/recipes/${recipe.id}`}>
                <div className={styles.media}>
                    <RecipeCardImage
                        src={recipe.image}
                        alt={recipe.name}
                        name={recipe.name}
                        index={index}
                        cookTimeMinutes={recipe.cookTimeMinutes}
                    />
                </div>
                <h2 className={styles.name}>{recipe.name}</h2>
                <div className={styles.metaRow}>
                    <span className={styles.cuisine}>{recipe.cuisine}</span>
                    <Stars rating={recipe.rating} />
                </div>
                <Description rating={recipe.rating} />
            </Link>
        </article>
    )
}
