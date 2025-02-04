import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppLayout from './AppLayout'

import { RouterProvider } from 'react-router-dom'
import { RouterApp } from './Router'
import { Provider } from 'react-redux'
import store from './store/store'

function App() {
  
  return (
    <>
    <Provider store={store}>
    <RouterProvider router={RouterApp}></RouterProvider>
    </Provider>
    </>
  )
}
export default App
