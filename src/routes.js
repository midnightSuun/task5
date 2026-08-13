import { createBrowserRouter } from 'react-router'
import { Recipes } from './pages/recipes'
import { RecipeDetails } from './pages/recipe-details'
import { SignIn } from './pages/sign-in'
import { NotFound } from './pages/not-found'
import { PublicRoute } from './components/public-route'
import { ProtectedRoute } from './components/protected-route'

export const router = createBrowserRouter([
    {
        Component: PublicRoute,
        children: [{ path: '/sign-in', Component: SignIn }],
    },
    {
        Component: ProtectedRoute,
        children: [
            { path: '/', Component: Recipes },
            { path: '/recipes/:recipeId', Component: RecipeDetails },
        ],
    },
    {
        path: '*',
        Component: NotFound,
    },
])
