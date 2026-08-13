import { Link } from 'react-router'
import { useGetRecipesQuery } from '../recipes-api'

export const Recipes = () => {
    const { data, isLoading, isError, error } = useGetRecipesQuery()

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error: {error.status}</p>

    return (
        <div>
            {data.recipes.map((recipe) => (
                <div key={recipe.id}>
                    <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                </div>
            ))}
        </div>
    )
}
