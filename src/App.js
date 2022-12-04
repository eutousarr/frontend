import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import NotesList from './features/notes/NotesList'
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import MatieresList from './features/matieres/MatieresList'
import EditMatiere from './features/matieres/EditMatiere'
import NewMatiere from './features/matieres/NewMatiere'
import CategorysList from './features/categories/CategorysList'
import EditCategory from './features/categories/EditCategory'
import NewCategory from './features/categories/NewCategory'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle';

function App() {
  useTitle('Kisarrweb')

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<Welcome />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>

                <Route path="matieres">
                  <Route index element={<MatieresList />} />
                  <Route path=":id" element={<EditMatiere />} />
                  <Route path="new" element={<NewMatiere />} />
                </Route>
                
                <Route path="categories">
                  <Route index element={<CategorysList />} />
                  <Route path=":id" element={<EditCategory />} />
                  <Route path="new" element={<NewCategory />} />
                </Route>

              </Route>{/* End Dash */}
            </Route>
          </Route>
        </Route>{/* End Protected Routes */}

      </Route>
    </Routes >
  );
}

export default App;
