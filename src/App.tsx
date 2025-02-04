import { createContext, Dispatch, SetStateAction, useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { RouterApp } from './Router'
import { Provider } from 'react-redux'
import store from './store/store'
import reducer from './components/user/reducer'
import { Action, User } from './types/user'
export const url = "http://localhost:3000/api/user";
export const userContext = createContext<{ user: User, userDispatch: React.Dispatch<Action> }>({
  user: {} as User,
  userDispatch: () => { }
});
export const IsLoggedIn = createContext<{ LoggedIn: boolean, setLoggedIn: Dispatch<SetStateAction<boolean>> }>({
  LoggedIn: false,
  setLoggedIn: () => { }
});
function App() {
  const { user, userDispatch } = reducer();
  const [LoggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <userContext.Provider value={{ user, userDispatch }}>
        <IsLoggedIn.Provider value={{ LoggedIn, setLoggedIn }}>
          <Provider store={store}>
            <RouterProvider router={RouterApp}></RouterProvider>
          </Provider>
        </IsLoggedIn.Provider>
      </userContext.Provider>
    </>
  )
}
export default App
