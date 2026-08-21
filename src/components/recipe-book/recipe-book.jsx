import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { useGetRecipesQuery } from '../../recipes-api'
import classNames from 'classnames'
import ChevronLeftIcon from '../../assets/icons/chevron-left.svg'
import ChevronRightIcon from '../../assets/icons/chevron-right.svg'
import { StatusMessage } from '../status-message'
import { getErrorMessage } from '../../utils/get-error-message'
import { CardsSpread, RECIPES_PER_SPREAD } from './cards-spread'
import { TitleSpread } from './title-spread'
import styles from './recipe-book.module.css'

const TITLE_SPREAD_COUNT = 1
const RECIPE_FIELDS = ['id', 'name', 'image', 'cuisine', 'cookTimeMinutes', 'rating']
const TOC_FIELDS = ['id', 'name']

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
    const isSearching = Boolean(q)
    const spread = page - 1
    const isTitleSpread = !isSearching && spread === 0
    const recipeSpread = isSearching ? spread : spread - TITLE_SPREAD_COUNT
    const skip = Math.max(0, recipeSpread) * RECIPES_PER_SPREAD
    const {
        data: tocData,
        isLoading: isTocLoading,
        isError: isTocError,
        error: tocError,
        refetch: refetchToc,
    } = useGetRecipesQuery(
        {
            limit: 0,
            skip: 0,
            select: TOC_FIELDS,
        },
        { skip: isSearching },
    )
    const {
        data,
        isLoading: isListLoading,
        isError,
        error,
        refetch: refetchList,
    } = useGetRecipesQuery(
        {
            limit: RECIPES_PER_SPREAD,
            skip,
            select: RECIPE_FIELDS,
            q,
        },
        { skip: isTitleSpread },
    )
    const recipes = data?.recipes ?? []
    const tocRecipes = tocData?.recipes ?? []
    const total = isSearching ? (data?.total ?? 0) : (tocData?.total ?? 0)
    const totalRecipeSpreads = Math.max(1, Math.ceil(total / RECIPES_PER_SPREAD))
    const totalSpreads = isSearching
        ? totalRecipeSpreads
        : TITLE_SPREAD_COUNT + totalRecipeSpreads
    const recipePageNumber = Math.max(0, recipeSpread) * 2
    const isLoading = isSearching
        ? isListLoading
        : isTitleSpread
          ? isTocLoading
          : isTocLoading || isListLoading
    const requestError = isSearching ? error : isTitleSpread ? tocError : error || tocError
    const hasError = isSearching ? isError : isTitleSpread ? isTocError : isError || isTocError

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

    const handleRetry = () => {
        if (!isSearching) refetchToc()
        if (!isTitleSpread) refetchList()
    }

    useEffect(() => {
        if (isLoading || hasError) return
        if (page <= totalSpreads) return

        const nextParams = { page: String(totalSpreads) }

        if (q) nextParams.q = q

        setSearchParams(nextParams)
    }, [hasError, isLoading, page, q, setSearchParams, totalSpreads])

    if (isLoading) {
        return <StatusMessage status="info" title="Opening the recipe book…" />
    }

    if (hasError) {
        return (
            <StatusMessage
                status="error"
                title="Could not load recipes"
                description={getErrorMessage(requestError)}
                actionLabel="Try again"
                onAction={handleRetry}
            />
        )
    }

    if (isSearching && total === 0) {
        return (
            <StatusMessage
                status="info"
                title="No recipes found"
                description={`Nothing matches “${q}”. Try another name.`}
            />
        )
    }

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
                {isTitleSpread ? (
                    <TitleSpread key={spread} recipes={tocRecipes} />
                ) : (
                    <CardsSpread
                        key={spread}
                        recipes={recipes}
                        skip={skip}
                        recipePageNumber={recipePageNumber}
                    />
                )}
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
                <button
                    type="button"
                    className={styles.mobileArrow}
                    aria-label="Previous spread"
                    disabled={spread === 0}
                    onClick={handlePrev}
                >
                    <ChevronLeftIcon />
                </button>
                <div className={styles.dots}>
                    {Array.from({ length: totalSpreads }, (_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={classNames(styles.dot, {
                                [styles.dotActive]: index === spread,
                            })}
                            aria-label={`Spread ${index + 1}`}
                            aria-current={index === spread ? 'true' : undefined}
                            onClick={() => handleDotClick(index)}
                        />
                    ))}
                </div>
                <button
                    type="button"
                    className={styles.mobileArrow}
                    aria-label="Next spread"
                    disabled={spread === totalSpreads - 1}
                    onClick={handleNext}
                >
                    <ChevronRightIcon />
                </button>
                <div className={styles.pageCount}>
                    Spread {spread + 1} of {totalSpreads}
                </div>
            </div>
        </div>
    )
}
