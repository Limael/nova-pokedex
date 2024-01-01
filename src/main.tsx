import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

import Legendaries from './pages/Legendaries'
import { Pokedex } from './pages/Pokedex'
import PokemonProvider from './Context/PokemonContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout children={<Home />} />,
  },
  {
    path: "/pokedex",
    element: <Layout children={<Pokedex />} />,
  },
  {
    path: "/legendaries",
    element: <Layout children={<Legendaries />} />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <PokemonProvider>
        <RouterProvider router={router} />
      </PokemonProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
