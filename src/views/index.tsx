import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Missing from '../components/Missing'
import RequireAuth from '../components/RequireAuth'
import Unauthorized from '../components/Unauthorized'
import { setAllBooks } from '../data-manage/features/books'
import { setLoadingIndicator } from '../data-manage/features/loading'
import { setAllUsers } from '../data-manage/features/user'
import { useAppDispatch } from '../data-manage/hooks'
import { Book } from '../data-manage/model/book-model'
import { Roles, User } from '../data-manage/model/user-model'
import { fetchJson } from '../services/requestUtil'
import { Constants } from '../utils/constants'
import Analytics from './analytics'
import BookManagement from './book'
import Layout from './layout'
import LoginPage from './login'
import UserManagement from './user'



export default function MainPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoadingIndicator(true));
    fetchJson(Constants.FETCH_USER_URL).then((response) => {
      dispatch(setAllUsers(response.users as User[]));
      setTimeout(() => (dispatch(setLoadingIndicator(false))), 2000);
    }).catch((error) => { console.log(error) })
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoadingIndicator(true));
    fetchJson(Constants.FETCH_BOOK_URL).then((response) => {
      dispatch(setAllBooks(response.books as Book[]));
      setTimeout(() => (dispatch(setLoadingIndicator(false))), 2000);
    }).catch((error) => { console.log(error) })
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* punlic routes */}
        <Route path="/" element={<Navigate to="analytics" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[Roles.admin]} />}>
          <Route path="/users" element={<UserManagement />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[Roles.editor, Roles.admin]} />}>
          <Route path="books" element={<BookManagement />} />
        </Route>
        <Route path="*" element={<Missing />} />

      </Route>
    </Routes>
  )
}
