import { useParams } from 'react-router-dom'
import EditMatiereForm from './EditMatiereForm'
import { useGetMatieresQuery } from './matieresApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import { useGetCategorysQuery } from '../categories/categorysApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditMatiere = () => {
    useTitle('Kis@rr-Web : Edit Catégorie')

    const { id } = useParams()

    const { username, isManager, isAdmin, isComptable } = useAuth()

    const { matiere } = useGetMatieresQuery("matieresList", {
        selectFromResult: ({ data }) => ({
          matiere: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    const { categories } = useGetCategorysQuery("categorysList", {
      selectFromResult: ({ data }) => ({
        categories: data?.ids.map(id => data?.entities[id])
      }),
  })

    if (!matiere || !users?.length) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin && !isComptable) {
        if (matiere.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditMatiereForm matiere={matiere} users={users} categorys={categories} />

    return content
}
export default EditMatiere