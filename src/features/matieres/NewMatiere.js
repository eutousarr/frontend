import NewMatiereForm from './NewMatiereForm'
import { useGetUsersQuery } from '../users/usersApiSlice'
import { useGetCategorysQuery } from '../categories/categorysApiSlice'
import { useGetGroupsQuery } from '../groups/groupsApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const NewMatiere = () => {
    useTitle('Kis@rr-Web: New matiere')

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    const { groups } = useGetGroupsQuery("groupsList", {
        selectFromResult: ({ data }) => ({
            groups: data?.ids.map(id => data?.entities[id])
        }),
    })

    const { categorys } = useGetCategorysQuery("categorysList", {
        selectFromResult: ({ data }) => ({
            categorys: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!users?.length || !categorys?.length || !groups?.length) return <PulseLoader color={"#FFF"} />

    const content = <NewMatiereForm users={users} categorys={categorys} groups={groups} />

    return content
}
export default NewMatiere