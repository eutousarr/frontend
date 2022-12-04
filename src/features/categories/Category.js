import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetCategorysQuery } from './categorysApiSlice'
import { memo } from 'react'

const Category = ({ categoryId }) => {

    const { category } = useGetCategorysQuery("categorysList", {
        selectFromResult: ({ data }) => ({
            category: data?.entities[categoryId]
        }),
    })

    const navigate = useNavigate()

    if (category) {
        const created = new Date(category.createdAt).toLocaleString('sn-SN', { day: 'numeric', month: 'long' })

        const updated = new Date(category.updatedAt).toLocaleString('sn-SN', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/categories/${categoryId}`)

        return (
            <tr className="table__row">
                <td className="table__cell category__status">
                    {category.completed
                        ? <span className="category__status--completed">Validé par {category.username} </span>
                        : <span className="category__status--open">Ouvert</span>
                    }
                </td>
                <td className="table__cell category__created">{created}</td>
                <td className="table__cell category__updated">{updated}</td>
                <td className="table__cell category__designation">{category.name}</td>
                <td className="table__cell category__numero">{category.numero}</td>

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

const memoizedCategory = memo(Category)

export default memoizedCategory
