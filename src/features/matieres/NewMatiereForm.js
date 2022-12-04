import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewMatiereMutation } from "./matieresApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewMatiereForm = ({ users, categorys, groups }) => {
  
    const [addNewMatiere, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewMatiereMutation()

    const navigate = useNavigate()

    const [numero, setNumero] = useState('')
    const [designation, setDesignation] = useState('')
    const [userId, setUserId] = useState(users[0].id)
    const [categoryId, setCategoryId] = useState()
    const [groupId, setGroupId] = useState()
    

    useEffect(() => {
        if (isSuccess) {
            setNumero('')
            setDesignation('')
            navigate('/dash/matieres')
        }
    }, [isSuccess, navigate])

    const onNumeroChanged = e => setNumero(e.target.value)
    const onDesignationChanged = e => setDesignation(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)
    const onCategoryIdChanged = e => setCategoryId(e.target.value)
    const onGroupIdChanged = e => setGroupId(e.target.value)
    
    const canSave = [numero, designation, categoryId, groupId].every(Boolean) && !isLoading

    const onSaveMatiereClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewMatiere({ user: userId, category: categoryId, group: groupId , numero, designation })
        }
    }

    const groupOptions = groups.map(group => {
      return (
          <option
              key={group.id}
              value={group.id}
          > {group.name}</option >
      )
    })

    const categoryOptions = categorys.map(category => {
      return (
          <option
              key={category.id}
              value={category.id}
          > {category.name}</option >
      )
    })
  
    const errClass = isError ? "errmsg" : "offscreen"
    const validNumeroClass = !numero ? "form__input--incomplete" : ''
    const validDesignationClass = !designation ? "form__input--incomplete" : ''
    const validgroupIdClass = !groupId ? "form__input--incomplete" : ''
    const validCategoryIdClass = !categoryId ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveMatiereClicked}>
                <div className="form__title-row">
                    <h2>New Matiere</h2>
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
                <input
                    className={`form__input  ${validDesignationClass}`}
                    id="name"
                    name="designation"
                    value={designation}
                    onChange={onDesignationChanged}
                />
                <input
                    className=""
                    name="user"
                    type="hidden"
                    value={userId}
                    onChange={onUserIdChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="groupId">
                    Groupe :</label>
                <select                    
                    id="groupId"
                    name="groupId"
                    className={`form__select_matiere  ${validgroupIdClass}`}
                    value={groupId}
                    onChange={onGroupIdChanged}
                >
                    <option value=""></option>
                    {groupOptions}
                </select>

                <label className="form__label form__checkbox-container" htmlFor="categoryId">
                    Catégorie :</label>
                <select
                    id="categoryId"
                    name="categoryId"
                    className={`form__select_matiere  ${validCategoryIdClass}`}
                    value={categoryId}
                    onChange={onCategoryIdChanged}
                >
                    <option value=""></option>
                    {categoryOptions}
                </select>

            </form>
        </>
    )

    return content
}

export default NewMatiereForm