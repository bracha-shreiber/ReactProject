import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Action, User } from "../types/user";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
import HomePage from "./homePage";
import { AppBar, Box, Toolbar } from "@mui/material";
import reducer from "./user/reducer";

// export const url = "http://localhost:3000/api/user";
// export const userContext = createContext<{ user: User, userDispatch: React.Dispatch<Action> }>({
//     user: {} as User,
//     userDispatch: () => { }
// });
// export const IsLoggedIn = createContext<{ LoggedIn: boolean, setLoggedIn: Dispatch<SetStateAction<boolean>> }>({
//     LoggedIn: false,
//     setLoggedIn: () => { }
// });
export default () => {
    // const { user, userDispatch } = reducer();
    // const [LoggedIn, setLoggedIn] = useState(false);
    return (
        <>
            {/* <userContext.Provider value={{ user, userDispatch }}>
                <IsLoggedIn.Provider value={{ LoggedIn, setLoggedIn }}> */}
                <Navbar></Navbar>
                <HomePage></HomePage>
                <Outlet/>
                    {/* <AppBar position="fixed"> {/* Change to fixed */}
                        {/* <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                           
                            <HomePage></HomePage>
                            <Navbar></Navbar>
                        </Toolbar> */}
                    {/* </AppBar> */} 
                    {/* <main>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="flex-start"
                            minHeight="100vh"
                            bgcolor="background.default"
                            pt={2}
                        >
                            <Outlet />
                        </Box>
                    </main> */}
                {/* </IsLoggedIn.Provider>
            </userContext.Provider> */}
        </>
    );
}
