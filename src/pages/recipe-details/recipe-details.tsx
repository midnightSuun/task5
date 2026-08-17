import { RecipeDetails } from '../../components/recipe-details'
import styles from './recipe-details.module.css'

export const RecipeDetailsPage = () => {
    return (
        <div className={styles.page}>
            <RecipeDetails />
        </div>
    )
}
