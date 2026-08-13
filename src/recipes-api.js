import { api } from './api'

export const recipesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: () => 'auth/recipes',
        }),
        getRecipeById: builder.query({
            query: (id) => `auth/recipes/${id}`,
        }),
    }),
})

export const { useGetRecipesQuery, useGetRecipeByIdQuery } = recipesApi
