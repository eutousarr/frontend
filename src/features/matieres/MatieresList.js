import { useGetMatieresQuery } from "./matieresApiSlice"
import Matiere from "./Matiere"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const MatieresList = () => {
    useTitle('Kis@rr-Web : Matieres List')

    const { username, isManager, isAdmin, isComptable } = useAuth()

    const {
        data: matieres,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetMatieresQuery('matieresList', {
        pollingInterval: 150000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = matieres

        let filteredIds
        if (isManager || isAdmin || isComptable) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(matiereId => entities[matiereId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(matiereId => <Matiere key={matiereId} matiereId={matiereId} />)

        content = (
            <table className="table table--matieres">
                <thead className="table__thead">
                    <tr>                        
                    <th scope="col" className="table__th matiere__status">Status</th>
                        <th scope="col" className="table__th matiere__created">Code</th>
                        <th scope="col" className="table__th matiere__updated">Updated</th>
                        <th scope="col" className="table__th matiere__category">Categorie</th>
                        <th scope="col" className="table__th matiere__designation">Désignation</th>
                        <th scope="col" className="table__th matiere__edit">Edit</th>
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
export default MatieresList