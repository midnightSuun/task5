import { createBrowserRouter } from 'react-router'
import { PublicRoute } from './components/public-route'
import { SignIn } from './pages/sign-in'

const loadProtectedRoute = async () => {
    const { ProtectedRoute } = await import('./components/protected-route')

    return { Component: ProtectedRoute }
}

const loadRecipes = async () => {
    const { Recipes } = await import('./pages/recipes/recipes')

    return { Component: Recipes }
}

const loadRecipeDetails = async () => {
    const { RecipeDetailsPage } = await import(
        './pages/recipe-details/recipe-details'
    )

    return { Component: RecipeDetailsPage }
}

const loadNotFound = async () => {
    const { NotFound } = await import('./pages/not-found')

    return { Component: NotFound }
}

export const router = createBrowserRouter([
    {
        Component: PublicRoute,
        children: [{ path: '/sign-in', Component: SignIn }],
    },
    {
        lazy: loadProtectedRoute,
        children: [
            { path: '/', lazy: loadRecipes },
            { path: '/recipes/:recipeId', lazy: loadRecipeDetails },
        ],
    },
    {
        path: '*',
        lazy: loadNotFound,
    },
])
