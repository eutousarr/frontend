import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetMatieresQuery } from './matieresApiSlice'
import { memo } from 'react'

const Matiere = ({ matiereId }) => {

    const { matiere } = useGetMatieresQuery("matieresList", {
        selectFromResult: ({ data }) => ({
            matiere: data?.entities[matiereId]
        }),
    })

    const navigate = useNavigate()

    if (matiere) {
        const created = new Date(matiere.createdAt).toLocaleString('sn-SN', { day: 'numeric', month: 'long' })

        const updated = new Date(matiere.updatedAt).toLocaleString('sn-SN', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/matieres/${matiereId}`)

        return (
            <tr className="table__row">
                <td className="table__cell matiere__status">
                    {matiere.completed
                        ? <span className="matiere__status--completed">Validé</span>
                        : <span className="matiere__status--open">Ouvert</span>
                    }
                </td>
                <td className="table__cell matiere__created">{matiere.codeGroup}.{matiere.codeCat}.{matiere.numero}</td>
                <td className="table__cell matiere__updated">{updated}</td>
                <td className="table__cell matiere__category">{matiere.categorie}</td>
                <td className="table__cell matiere__designation">{matiere.designation}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}

const memoizedMatiere = memo(Matiere)

export default memoizedMatiere
