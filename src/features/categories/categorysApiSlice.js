import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const categorysAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.numero === b.numero) ? 0 : a.numero ? 1 : -1
})

const initialState = categorysAdapter.getInitialState()

export const categorysApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCategorys: builder.query({
            query: () => ({
                url: '/categories',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedCategorys = responseData.map(category => {
                    category.id = category._id
                    return category
                });
                return categorysAdapter.setAll(initialState, loadedCategorys)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Category', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Category', id }))
                    ]
                } else return [{ type: 'Category', id: 'LIST' }]
            }
        }),
        addNewCategory: builder.mutation({
            query: initialCategory => ({
                url: '/categories',
                method: 'POST',
                body: {
                    ...initialCategory,
                }
            }),
            invalidatesTags: [
                { type: 'Category', id: "LIST" }
            ]
        }),
        updateCategory: builder.mutation({
            query: initialCategory => ({
                url: '/categories',
                method: 'PATCH',
                body: {
                    ...initialCategory,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: arg.id }
            ]
        }),
        deleteCategory: builder.mutation({
            query: ({ id }) => ({
                url: `/categories`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Category', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetCategorysQuery,
    useAddNewCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categorysApiSlice

// returns the query result object
export const selectCategorysResult = categorysApiSlice.endpoints.getCategorys.select()

// creates memoized selector
const selectCategorysData = createSelector(
    selectCategorysResult,
    categorysResult => categorysResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCategorys,
    selectById: selectCategoryById,
    selectIds: selectCategoryIds
    // Pass in a selector that returns the categorys slice of state
} = categorysAdapter.getSelectors(state => selectCategorysData(state) ?? initialState)