import ReactDOM from 'react-dom/client'
import './index.css'

import Layout from './components/Layout'
import Index from './pages/Index'
import NuevoCliente from './pages/NuevoCliente'
import ErrorPage from './components/ErrorPage'

import { loader as clientesLoader } from './pages/Index'
import { action as nuevoClienteAction } from './pages/NuevoCliente'

import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import React from 'react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children:[
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
