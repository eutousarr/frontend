import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const groupsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.numero === b.numero) ? 0 : a.numero ? 1 : -1
})

const initialState = groupsAdapter.getInitialState()

export const groupsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getGroups: builder.query({
            query: () => ({
                url: '/groups',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedGroups = responseData.map(group => {
                    group.id = group._id
                    return group
                });
                return groupsAdapter.setAll(initialState, loadedGroups)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Group', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Group', id }))
                    ]
                } else return [{ type: 'Group', id: 'LIST' }]
            }
        }),
        addNewGroup: builder.mutation({
            query: initialGroup => ({
                url: '/groups',
                method: 'POST',
                body: {
                    ...initialGroup,
                }
            }),
            invalidatesTags: [
                { type: 'Group', id: "LIST" }
            ]
        }),
        // updateGroup: builder.mutation({
        //     query: initialGroup => ({
        //         url: '/groups',
        //         method: 'PATCH',
        //         body: {
        //             ...initialGroup,
        //         }
        //     }),
        //     invalidatesTags: (result, error, arg) => [
        //         { type: 'Group', id: arg.id }
        //     ]
        // }),
        // deleteGroup: builder.mutation({
        //     query: ({ id }) => ({
        //         url: `/groups`,
        //         method: 'DELETE',
        //         body: { id }
        //     }),
        //     invalidatesTags: (result, error, arg) => [
        //         { type: 'Group', id: arg.id }
        //     ]
        // }),
    }),
})

export const {
    useGetGroupsQuery,
    useAddNewGroupMutation,
    // useUpdateGroupMutation,
    // useDeleteGroupMutation,
} = groupsApiSlice

// returns the query result object
export const selectGroupsResult = groupsApiSlice.endpoints.getGroups.select()

// creates memoized selector
const selectGroupsData = createSelector(
    selectGroupsResult,
    groupsResult => groupsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllGroups,
    selectById: selectGroupById,
    selectIds: selectGroupIds
    // Pass in a selector that returns the groups slice of state
} = groupsAdapter.getSelectors(state => selectGroupsData(state) ?? initialState)