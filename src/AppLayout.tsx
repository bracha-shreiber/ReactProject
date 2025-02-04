import { createContext, Dispatch, SetStateAction } from "react";
import { Action, User } from "./types/user";

import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";
import HomePage from "./components/homePage";
import { AppBar, Box, Toolbar } from "@mui/material";

export const url = "http://localhost:3000/api/user";
export const userContext = createContext<{ user: User, userDispatch: React.Dispatch<Action> }>({
    user: {} as User,
    userDispatch: () => {}
});

export default () => {
    return (
        <>
            <AppBar position="fixed"> {/* Change to fixed */}
                <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                    <HomePage />
                    <Navbar />
                </Toolbar>
            </AppBar>
            <main>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="flex-start"
                    minHeight="100vh"
                    bgcolor="background.default"
                    pt={2}
                    mt={8} // Add margin-top to avoid overlap with AppBar
                >
                    <Outlet />
                </Box>
            </main>
        </>
    );
}
