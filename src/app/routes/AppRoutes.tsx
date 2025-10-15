import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Login from '@/pages/Login/Login'
import Home from '@/pages/Home/Home'
import RegisterForm from '@/pages/Register/RegisterForms'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <RegisterForm />,
  },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}
