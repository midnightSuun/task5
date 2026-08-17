import { RecipeBook } from '../../components/recipe-book'
import styles from './recipes.module.css'

export const Recipes = () => {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <h1>Recipe book</h1>
                <p>Flip the pages and collect dish cards</p>
            </section>
            <RecipeBook />
            <p className={styles.hint}>
                4 recipes per spread · use arrows or dots
            </p>
        </div>
    )
}
