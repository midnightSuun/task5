import { api } from './api'

export const recipesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: ({ limit, skip, select, q }) => {
                const params = new URLSearchParams({
                    limit: String(limit),
                    skip: String(skip),
                })

                select.forEach((field) => {
                    params.append('select', field)
                })

                if (q) {
                    params.set('q', q)
                    return `recipes/search?${params}`
                }

                return `recipes?${params}`
            },
        }),
        getRecipeById: builder.query({
            query: (id) => `auth/recipes/${id}`,
        }),
    }),
})

export const { useGetRecipesQuery, useGetRecipeByIdQuery } = recipesApi
