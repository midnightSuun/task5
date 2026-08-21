import { Link, useLocation } from 'react-router'
import { BookPage } from './book-page'
import styles from './title-spread.module.css'

export const TitleSpread = ({ recipes }) => {
    const location = useLocation()

    return (
        <>
            <BookPage side="left" label="Title">
                <div className={styles.titlePage}>
                    <span className={styles.titleBadge}>🍳</span>
                    <h2 className={styles.titleName}>Recipe Deck</h2>
                    <p className={styles.titleTagline}>
                        A handwritten collection of dishes
                    </p>
                </div>
            </BookPage>
            <BookPage side="right" label="Contents">
                <ol className={styles.tocList}>
                    {recipes.map((recipe, index) => (
                        <li key={recipe.id} className={styles.tocItem}>
                            <Link
                                className={styles.tocLink}
                                to={`/recipes/${recipe.id}`}
                                state={{ search: location.search }}
                            >
                                <span className={styles.tocIndex}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className={styles.tocName}>
                                    {recipe.name}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ol>
            </BookPage>
        </>
    )
}
