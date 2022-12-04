import { useState, useEffect } from "react"
import { useUpdateCategoryMutation, useDeleteCategoryMutation } from "./categorysApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const EditCategoryForm = ({ category, users }) => {

    const { isManager, isAdmin } = useAuth()

    const [updateCategory, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateCategoryMutation()

    const [deleteCategory, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteCategoryMutation()

    const navigate = useNavigate()

    const [numero, setNumero] = useState(category.numero)
    const [name, setName] = useState(category.name)
    const [completed, setCompleted] = useState(category.completed)
    const [validedBy, setValidedBy] = useState(category.validedBy)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setNumero('')
            setName('')
            setValidedBy('')
            navigate('/dash/categories')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onNumeroChanged = e => setNumero(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)

    const canSave = [numero, name].every(Boolean) && !isLoading

    const onSaveCategoryClicked = async (e) => {
        if (canSave) {
            
            await updateCategory({ id: category.id, validedBy: users[0].username, numero, name, completed })
            console.log(completed)
        }
        
    }

    const onDeleteCategoryClicked = async () => {
        await deleteCategory({ id: category.id })
    }

    const created = new Date(category.createdAt).toLocaleString('sn-SN', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(category.updatedAt).toLocaleString('sn-SN', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user._id}
                value={user.username}

            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validNumeroClass = !numero ? "form__input--incomplete" : ''
    const validNameClass = !name ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin ) {
        deleteButton = (
            <button
                className="icon-button"
                name="Delete"
                onClick={onDeleteCategoryClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Category #{category.numero}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveCategoryClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label className="form__label" htmlFor="category-title">
                    Numéro :</label>
                <input
                    className={`form__input ${validNumeroClass}`}
                    id="category-title"
                    name="numero"
                    type="text"
                    autoComplete="off"
                    value={numero}
                    onChange={onNumeroChanged}
                />

                <label className="form__label" htmlFor="category-text">
                    Désignation:</label>
                <textarea
                    className={`form__input form__input--text ${validNameClass}`}
                    id="category-text"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />
                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="category-completed">
                            CATEGORY VALIDEE:
                            <input
                                className="form__checkbox"
                                id="category-completed"
                                name="completed"
                                type="checkbox"
                                onChange={onCompletedChanged}
                            />
                        </label>

                        <label className="form__label form__checkbox-container" htmlFor="category-username">
                            VALIDED BY:</label>
                        <input
                            id="category-username"
                            type="text"
                            name="validedBy"
                            className="form__select"
                            value={users[0].username}
                            disabled
                        />                            
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    )

    return content
}

export default EditCategoryForm