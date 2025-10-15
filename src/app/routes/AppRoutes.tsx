import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Login from '@/pages/Login/Login'
import Home from '@/pages/Home/Home'

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
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}
