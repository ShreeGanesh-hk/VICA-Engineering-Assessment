import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Unauthorized from './components/Unauthorized'
import { Roles } from './data-manage/model/user-model'
import Analytics from './views/analytics'
import BookManagement from './views/book'
import LoginPage from './views/login'
import UserManagement from './views/user'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/analytics" replace={true} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            <Route element={<RequireAuth allowedRoles={[Roles.admin]} />}>
                <Route path="/users" element={<UserManagement />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[Roles.editor,Roles.admin]} />}>
                <Route path="/books" element={<BookManagement />} />
            </Route>



        </Routes>
    )
}

export default MainRoutes