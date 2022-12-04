import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewCategoryMutation } from "./categorysApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewCategoryForm = ({ users }) => {

    const [addNewCategory, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewCategoryMutation()

    const navigate = useNavigate()

    const [numero, setNumero] = useState('')
    const [name, setName] = useState('')
    const [userId, setUserId] = useState(users[0].id)
    

    useEffect(() => {
        if (isSuccess) {
            setNumero('')
            setName('')
            navigate('/dash/categories')
        }
    }, [isSuccess, navigate])

    const onNumeroChanged = e => setNumero(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)
    
    const canSave = [numero, name, userId].every(Boolean) && !isLoading

    const onSaveCategoryClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewCategory({ user: userId, numero, name })
        }
    }
  
    const errClass = isError ? "errmsg" : "offscreen"
    const validNumeroClass = !numero ? "form__input--incomplete" : ''
    const validNameClass = !name ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveCategoryClicked}>
                <div className="form__title-row">
                    <h2>New Category</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="numero">
                    Code :
                </label>
                <input
                    className={`form__input ${validNumeroClass}`}
                    id="numero"
                    name="numero"
                    type="text"
                    autoComplete="off"
                    value={numero}
                    onChange={onNumeroChanged}
                />

                <label className="form__label" htmlFor="name">
                    Désignation :
                </label>
                <textarea
                    className={`form__input form__input--text ${validNameClass}`}
                    id="name"
                    name="name"
                    value={name}
                    onChange={onNameChanged}
                />
                <input
                    className=""
                    name="user"
                    type="hidden"
                    value={userId}
                    onChange={onUserIdChanged}
                />
            </form>
        </>
    )

    return content
}

export default NewCategoryForm