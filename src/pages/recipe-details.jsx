import { useParams } from 'react-router'
import { useGetRecipeByIdQuery } from '../recipes-api'

export const RecipeDetails = () => {
    const params = useParams()
    const { data, isLoading, isError, error } = useGetRecipeByIdQuery(
        params.recipeId
    )

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error: {error.status}</p>

    return (
        <div>
            <h1>{data.name}</h1>
            <img src={data.image} alt={data.name} />
            <p>
                {data.cuisine} · {data.difficulty} · {data.caloriesPerServing}{' '}
                kcal · {data.servings} servings
            </p>
            <h2>Ingredients</h2>
            <ul>
                {data.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>
            <h2>Instructions</h2>
            <ol>
                {data.instructions.map((step) => (
                    <li key={step}>{step}</li>
                ))}
            </ol>
        </div>
    )
}
