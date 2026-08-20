import { RecipeCard } from '../recipe-card'
import { BookPage } from './book-page'
import styles from './cards-spread.module.css'

export const RECIPES_PER_PAGE = 2
export const RECIPES_PER_SPREAD = RECIPES_PER_PAGE * 2

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

export const CardsSpread = ({ recipes, skip, recipePageNumber }) => {
    const leftItems = recipes.slice(0, RECIPES_PER_PAGE)
    const rightItems = recipes.slice(RECIPES_PER_PAGE, RECIPES_PER_SPREAD)

    return (
        <>
            <BookPage side="left" label={`Page ${recipePageNumber + 1}`}>
                <div className={styles.pageCards}>
                    {fillPage(leftItems, skip)}
                </div>
            </BookPage>
            <BookPage side="right" label={`Page ${recipePageNumber + 2}`}>
                <div className={styles.pageCards}>
                    {fillPage(rightItems, skip + RECIPES_PER_PAGE)}
                </div>
            </BookPage>
        </>
    )
}
