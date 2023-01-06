import ReactDOM from 'react-dom/client'
import './index.css'

import Layout from './components/Layout'
import Index from './pages/Index'
import NuevoCliente from './pages/NuevoCliente'

import { loader as clientesLoader } from './pages/Index'

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
        loader: clientesLoader
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
