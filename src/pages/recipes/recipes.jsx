import { useMemo, useState } from 'react'
import classNames from 'classnames'
import { RecipeBook } from '../../components/recipe-book'
import { useGetRecipesQuery } from '../../recipes-api'
import styles from './recipes.module.css'

const ALL_CUISINES = 'All'

export const Recipes = () => {
    const { data, isLoading, isError, error } = useGetRecipesQuery()
    const [query, setQuery] = useState('')
    const [cuisine, setCuisine] = useState(ALL_CUISINES)

    const cuisines = useMemo(() => {
        if (!data?.recipes) return [ALL_CUISINES]

        const uniqueCuisines = [
            ...new Set(data.recipes.map((recipe) => recipe.cuisine)),
        ]

        return [ALL_CUISINES, ...uniqueCuisines]
    }, [data])

    const recipes = useMemo(() => {
        if (!data?.recipes) return []

        const normalizedQuery = query.trim().toLowerCase()

        return data.recipes.filter((recipe) => {
            const matchesCuisine =
                cuisine === ALL_CUISINES || recipe.cuisine === cuisine
            const matchesQuery = recipe.name
                .toLowerCase()
                .includes(normalizedQuery)

            return matchesCuisine && matchesQuery
        })
    }, [cuisine, data, query])

    const handleQueryChange = (event) => {
        setQuery(event.target.value)
    }

    const handleCuisineClick = (nextCuisine) => {
        setCuisine(nextCuisine)
    }

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error: {error.status}</p>

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <h1>Recipe book</h1>
                <p>Flip the pages and collect dish cards</p>
                <input
                    className={styles.search}
                    type="search"
                    value={query}
                    placeholder="Find a recipe..."
                    onChange={handleQueryChange}
                />
            </section>
            <div className={styles.cuisineRow}>
                {cuisines.map((item) => (
                    <button
                        key={item}
                        type="button"
                        className={classNames(styles.tag, {
                            [styles.tagActive]: item === cuisine,
                        })}
                        onClick={() => handleCuisineClick(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>
            <RecipeBook recipes={recipes} />
            <p className={styles.hint}>
                4 recipes per spread · use arrows or dots
            </p>
        </div>
    )
}
