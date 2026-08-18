import { useSearchParams } from 'react-router'
import { RecipeCard } from '../recipe-card'
import { useGetRecipesQuery } from '../../recipes-api'
import classNames from 'classnames'
import ChevronLeftIcon from '../../assets/icons/chevron-left.svg'
import ChevronRightIcon from '../../assets/icons/chevron-right.svg'
import styles from './recipe-book.module.css'

const RECIPES_PER_PAGE = 2
const RECIPES_PER_SPREAD = RECIPES_PER_PAGE * 2
const RECIPE_FIELDS = [
    'id',
    'name',
    'image',
    'cuisine',
    'cookTimeMinutes',
    'rating',
]

const fillPage = (items, startIndex) => {
    const cards = items.map((recipe, index) => (
        <RecipeCard
            key={recipe.id}
            recipe={recipe}
            index={startIndex + index}
        />
    ))
    const emptySlots = Array.from(
        { length: RECIPES_PER_PAGE - items.length },
        (_, slot) => (
            <div key={`empty-${startIndex}-${slot}`} className={styles.emptySlot}>
                end of collection
            </div>
        ),
    )

    return [...cards, ...emptySlots]
}

const getPageFromSearch = (searchParams) => {
    const pageParam = Number(searchParams.get('page'))

    if (!Number.isInteger(pageParam) || pageParam < 1) return 1

    return pageParam
}

const getQueryFromSearch = (searchParams) => {
    return searchParams.get('q')?.trim() ?? ''
}

export const RecipeBook = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = getPageFromSearch(searchParams)
    const q = getQueryFromSearch(searchParams)
    const spread = page - 1
    const skip = spread * RECIPES_PER_SPREAD
    const { data, isError, error } = useGetRecipesQuery({
        limit: RECIPES_PER_SPREAD,
        skip,
        select: RECIPE_FIELDS,
        q,
    })
    const recipes = data?.recipes ?? []
    const total = data?.total ?? 0
    const totalSpreads = Math.max(1, Math.ceil(total / RECIPES_PER_SPREAD))

    const leftItems = recipes.slice(0, RECIPES_PER_PAGE)
    const rightItems = recipes.slice(RECIPES_PER_PAGE, RECIPES_PER_SPREAD)

    const handleGoToSpread = (nextSpread) => {
        const nextPage = Math.min(totalSpreads, Math.max(1, nextSpread + 1))
        const nextParams = { page: String(nextPage) }

        if (q) nextParams.q = q

        setSearchParams(nextParams)
    }

    const handlePrev = () => {
        handleGoToSpread(spread - 1)
    }

    const handleNext = () => {
        handleGoToSpread(spread + 1)
    }

    const handleDotClick = (index) => {
        handleGoToSpread(index)
    }

    if (isError) return <p>Error: {error.status}</p>

    return (
        <div className={styles.stage}>
            <div className={styles.book}>
                <div className={styles.spine} />
                <button
                    type="button"
                    className={classNames(styles.arrow, styles.arrowLeft)}
                    aria-label="Previous spread"
                    disabled={spread === 0}
                    onClick={handlePrev}
                >
                    <ChevronLeftIcon />
                </button>
                <div
                    key={`left-${spread}`}
                    className={classNames(
                        styles.page,
                        styles.left,
                        styles.pageTurn
                    )}
                >
                    <div className={styles.pageLabel}>Page {spread * 2 + 1}</div>
                    <div className={styles.pageCards}>
                        {fillPage(leftItems, skip)}
                    </div>
                </div>
                <div
                    key={`right-${spread}`}
                    className={classNames(
                        styles.page,
                        styles.right,
                        styles.pageTurn
                    )}
                >
                    <div className={styles.pageLabel}>Page {spread * 2 + 2}</div>
                    <div className={styles.pageCards}>
                        {fillPage(rightItems, skip + RECIPES_PER_PAGE)}
                    </div>
                </div>
                <button
                    type="button"
                    className={classNames(styles.arrow, styles.arrowRight)}
                    aria-label="Next spread"
                    disabled={spread === totalSpreads - 1}
                    onClick={handleNext}
                >
                    <ChevronRightIcon />
                </button>
            </div>
            <div className={styles.footer}>
                <div className={styles.dots}>
                    {Array.from({ length: totalSpreads }, (_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={classNames(styles.dot, {
                                [styles.dotActive]: index === spread,
                            })}
                            aria-label={`Spread ${index + 1}`}
                            onClick={() => handleDotClick(index)}
                        />
                    ))}
                </div>
                <div className={styles.pageCount}>
                    Spread {spread + 1} of {totalSpreads}
                </div>
            </div>
        </div>
    )
}
