import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let isComptable = false
    let status = "Employee"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')
        isComptable = roles.includes('Comptable')

        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"
        if (isComptable) status = "Comptable"

        return { username, roles, status, isManager, isAdmin, isComptable }
    }

    return { username: '', roles: [], isManager, isAdmin, isComptable, status }
}
export default useAuth