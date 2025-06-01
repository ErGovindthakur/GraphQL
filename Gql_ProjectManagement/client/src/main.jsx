import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {ApolloProvider,InMemoryCache,ApolloClient} from "@apollo/client"
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider, Routes } from 'react-router-dom'
import Home from './components/Home.jsx'

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache:new InMemoryCache
})

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />} />
      <Route path='/product/:id' element={<Home />}/>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
  </StrictMode>,
)
