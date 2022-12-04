import { useParams } from 'react-router-dom'
import EditCategoryForm from './EditCategoryForm'
import { useGetCategorysQuery } from './categorysApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditCategory = () => {
    useTitle('Kis@rr-Web : Edit Catégorie')

    const { id } = useParams()

    const { username, isManager, isAdmin } = useAuth()

    const { category } = useGetCategorysQuery("categorysList", {
        selectFromResult: ({ data }) => ({
          category: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!category || !users?.length) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin) {
        if (category.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditCategoryForm category={category} users={users} />

    return content
}
export default EditCategory