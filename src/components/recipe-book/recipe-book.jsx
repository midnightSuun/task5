import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { RecipeCard } from '../recipe-card'
import styles from './recipe-book.module.css'

const RECIPES_PER_PAGE = 2
const RECIPES_PER_SPREAD = RECIPES_PER_PAGE * 2

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
            <div
                key={`empty-${startIndex}-${slot}`}
                className={styles.emptySlot}
            >
                end of collection
            </div>
        )
    )

    return [...cards, ...emptySlots]
}

export const RecipeBook = ({ recipes }) => {
    const [spread, setSpread] = useState(0)
    const totalSpreads = Math.max(
        1,
        Math.ceil(recipes.length / RECIPES_PER_SPREAD)
    )

    useEffect(() => {
        setSpread(0)
    }, [recipes])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                setSpread((current) => Math.max(0, current - 1))
            }
            if (event.key === 'ArrowRight') {
                setSpread((current) => Math.min(totalSpreads - 1, current + 1))
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [totalSpreads])

    const startIndex = spread * RECIPES_PER_SPREAD
    const leftItems = recipes.slice(startIndex, startIndex + RECIPES_PER_PAGE)
    const rightItems = recipes.slice(
        startIndex + RECIPES_PER_PAGE,
        startIndex + RECIPES_PER_SPREAD
    )

    const handlePrev = () => {
        setSpread((current) => Math.max(0, current - 1))
    }

    const handleNext = () => {
        setSpread((current) => Math.min(totalSpreads - 1, current + 1))
    }

    const handleDotClick = (index) => {
        setSpread(index)
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
                    <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
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
                        {fillPage(leftItems, startIndex)}
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
                        {fillPage(rightItems, startIndex + RECIPES_PER_PAGE)}
                    </div>
                </div>
                <button
                    type="button"
                    className={classNames(styles.arrow, styles.arrowRight)}
                    aria-label="Next spread"
                    disabled={spread === totalSpreads - 1}
                    onClick={handleNext}
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 18l6-6-6-6" />
                    </svg>
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
