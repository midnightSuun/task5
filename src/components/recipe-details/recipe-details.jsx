import { useParams } from 'react-router'
import { useGetRecipeByIdQuery } from '../../recipes-api'
import { Image } from '../ui/image'
import { Stars } from '../ui/stars'
import { Description } from './description'
import styles from './recipe-details.module.css'

export const RecipeDetails = () => {
    const params = useParams()
    const { data, isLoading, isError, error } = useGetRecipeByIdQuery(params.recipeId)

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error: {error.status}</p>

    const mealType = data.mealType?.[0] ?? data.cuisine

    return (
        <article className={styles.card}>
            <div className={styles.topRow}>
                <span className={styles.meta}>{mealType}</span>
                <span className={styles.meta}>+{data.caloriesPerServing}</span>
            </div>

            <Image variant="details" src={data.image} alt={data.name} />

            <div className={styles.titleBar}>
                <h1 className={styles.title}>{data.name}</h1>
                <Stars rating={data.rating} variant="light" />
            </div>

            <Description
                ingredients={data.ingredients}
                instructions={data.instructions}
            />

            <p className={styles.footer}>
                <span className={styles.flourish}>///</span>
                {data.difficulty} · {data.cuisine} · {data.servings} servings
                <span className={styles.flourish}>///</span>
            </p>
        </article>
    )
}
