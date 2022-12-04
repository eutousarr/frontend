import { useGetCategorysQuery } from "./categorysApiSlice"
import Category from "./Category"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const CategorysList = () => {
    useTitle('Kis@rr-Web : Catégories')

    const { username, isManager, isAdmin } = useAuth()

    const {
        data: categorys,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCategorysQuery('categorysList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = categorys

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(categoryId => entities[categoryId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(categoryId => <Category key={categoryId} categoryId={categoryId} />)

        content = (
            <table className="table table--categorys">
                <thead className="table__thead">
                    <tr>                        
                        <th scope="col" className="table__th category__status">Status</th>
                        <th scope="col" className="table__th category__created">Created</th>
                        <th scope="col" className="table__th category__updated">Updated</th>
                        <th scope="col" className="table__th category__designation">Désignation</th>
                        <th scope="col" className="table__th category__numero">Code</th>
                        <th scope="col" className="table__th category__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default CategorysList