import { Link, useLocation, useParams } from 'react-router'
import { useGetRecipeByIdQuery } from '../../recipes-api'
import ChevronLeftIcon from '../../assets/icons/chevron-left.svg'
import { Image } from '../ui/image'
import { Stars } from '../ui/stars'
import { StatusMessage } from '../status-message'
import { getErrorMessage } from '../../utils/get-error-message'
import { Description } from './description'
import styles from './recipe-details.module.css'

const getRecipesListTo = (location) => {
    const search = location.state?.search

    if (typeof search === 'string' && search) {
        return { pathname: '/', search }
    }

    return '/'
}

export const RecipeDetails = () => {
    const params = useParams()
    const location = useLocation()
    const recipesTo = getRecipesListTo(location)
    const { data, isLoading, isError, error, refetch } = useGetRecipeByIdQuery(
        params.recipeId
    )

    const backLink = (
        <Link className={styles.back} to={recipesTo}>
            <ChevronLeftIcon />
            Back to recipes
        </Link>
    )

    if (isLoading) {
        return (
            <div className={styles.stack}>
                {backLink}
                <StatusMessage status="info" title="Loading recipe…" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className={styles.stack}>
                {backLink}
                <StatusMessage
                    status="error"
                    title="Could not open this recipe"
                    description={getErrorMessage(error)}
                    actionLabel="Try again"
                    onAction={refetch}
                />
            </div>
        )
    }

    const mealType = data.mealType?.[0] ?? data.cuisine

    return (
        <div className={styles.stack}>
            {backLink}
            <article className={styles.card}>
                <div className={styles.topRow}>
                    <span className={styles.meta}>{mealType}</span>
                    <span className={styles.meta}>+{data.caloriesPerServing}</span>
                </div>

                <div className={styles.photo}>
                    <Image
                        variant="details"
                        src={data.image}
                        alt={data.name}
                    width={336}
                    height={146}
                        decoding="async"
                        fetchPriority="high"
                    />
                </div>

                <div className={styles.titleBar}>
                    <h1 className={styles.title}>{data.name}</h1>
                    <Stars rating={data.rating} variant="light" />
                </div>

                <Description
                    ingredients={data.ingredients}
                    instructions={data.instructions}
                />

                <p className={styles.footer}>
                    <span>/</span>
                    {data.difficulty} · {data.cuisine} · {data.servings} servings
                    <span>/</span>
                </p>
            </article>
        </div>
    )
}
