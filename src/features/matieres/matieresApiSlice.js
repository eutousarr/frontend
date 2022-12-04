import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const matieresAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.numero === b.numero) ? 0 : a.numero ? 1 : -1
})

const initialState = matieresAdapter.getInitialState()

export const matieresApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMatieres: builder.query({
            query: () => ({
                url: '/matieres',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedMatieres = responseData.map(matiere => {
                    matiere.id = matiere._id
                    return matiere
                });
                return matieresAdapter.setAll(initialState, loadedMatieres)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Matiere', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Matiere', id }))
                    ]
                } else return [{ type: 'Matiere', id: 'LIST' }]
            }
        }),
        addNewMatiere: builder.mutation({
            query: initialMatiere => ({
                url: '/matieres',
                method: 'POST',
                body: {
                    ...initialMatiere,
                }
            }),
            invalidatesTags: [
                { type: 'Matiere', id: "LIST" }
            ]
        }),
        updateMatiere: builder.mutation({
            query: initialMatiere => ({
                url: '/matieres',
                method: 'PATCH',
                body: {
                    ...initialMatiere,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Matiere', id: arg.id }
            ]
        }),
        deleteMatiere: builder.mutation({
            query: ({ id }) => ({
                url: `/matieres`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Matiere', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetMatieresQuery,
    useAddNewMatiereMutation,
    useUpdateMatiereMutation,
    useDeleteMatiereMutation,
} = matieresApiSlice

// returns the query result object
export const selectMatieresResult = matieresApiSlice.endpoints.getMatieres.select()

// creates memoized selector
const selectMatieresData = createSelector(
    selectMatieresResult,
    matieresResult => matieresResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllMatieres,
    selectById: selectMatiereById,
    selectIds: selectMatiereIds
    // Pass in a selector that returns the matieres slice of state
} = matieresAdapter.getSelectors(state => selectMatieresData(state) ?? initialState)