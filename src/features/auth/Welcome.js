import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'

const Welcome = () => {

    const { username, isManager, isAdmin } = useAuth()

    useTitle(`kis@rr-Web: ${username}`)

    const date = new Date()
    const today = new Intl.DateTimeFormat('sn-SN', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Bienvenue {username} !</h1>

            <p><Link to="/dash/notes">Voir les Notes</Link></p>

            <p><Link to="/dash/notes/new">Ajouter une Note</Link></p>
            <hr />
            <p><Link to="/dash/matieres">Voir les Matieres</Link></p>

            <p><Link to="/dash/matieres/new">Ajouter une Matiere</Link></p>
            <hr />

            {(isManager || isAdmin) && <p><Link to="/dash/users">Utilisateurs</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dash/users/new">Ajouter un User</Link></p>}

        </section>
    )

    return content
}
export default Welcome