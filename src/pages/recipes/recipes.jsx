import { useGetRecipesQuery } from '../../recipes-api'
import { RecipeCard } from '../../components/recipe-card'
import styles from './recipes.module.css'

export const Recipes = () => {
    const { data, isLoading, isError, error } = useGetRecipesQuery()

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error: {error.status}</p>

    return (
        <div className={styles.page}>
            <div className={styles.list}>
                {data.recipes.map((recipe, index) => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
}
