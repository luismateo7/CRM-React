import ReactDOM from 'react-dom/client'
import './index.css'

import Layout from './components/Layout'
import Index from './pages/Index'
import NuevoCliente from './pages/NuevoCliente'
import ErrorPage from './components/ErrorPage'
import EditarCliente from './pages/EditarCliente'

import { loader as clientesLoader } from './pages/Index'
import { action as nuevoClienteAction } from './pages/NuevoCliente'
import { loader as editarClienteLoader } from './pages/EditarCliente'
import { action as editarClienteAction } from './pages/EditarCliente'
import { action as eliminatClienteAction } from './components/Cliente'

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
      },
      {
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente />,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:clienteId/eliminar',
        action: eliminatClienteAction,
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
