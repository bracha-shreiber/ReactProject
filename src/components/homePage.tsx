import { createContext, Dispatch, SetStateAction, useState } from "react";
import Login from "./user/login";
import UpdateUser from "./user/updateUser";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

export const IsLoggedIn = createContext<{ LoggedIn: boolean, setLoggedIn: Dispatch<SetStateAction<boolean>> }>({
    LoggedIn: false,
    setLoggedIn: () => {}
});

export default () => {
    const [LoggedIn, setLoggedIn] = useState<boolean>(false);
    const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [update, setUpdate] = useState<boolean>(false);

    const navigate = useNavigate();

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: 'transparent' }}>
                <Toolbar>
                    <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-start' }}>
                        <Button 
                            variant="contained" 
                            sx={{ backgroundColor: '#4CAF50', color: '#FFFFFF', mr: 1 }} // Button color
                            onClick={() => { setMode("signIn"); setLoggedIn(true); setShowModal(true); }} 
                        >
                            Sign In
                        </Button>
                        <Button 
                            variant="contained" 
                            sx={{ backgroundColor: '#4CAF50', color: '#FFFFFF' }} // Button color
                            onClick={() => { setMode("signUp"); setLoggedIn(true); setShowModal(true); }} 
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            {LoggedIn && showModal && 
                <Login state={mode === "signIn"} close={() => setShowModal(false)} showModal={showModal} />
            }
            {LoggedIn && !showModal && 
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 2 }}>
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        onClick={() => setUpdate(true)} 
                        sx={{ mb: 1 }}
                    >
                        Update
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="error" 
                        onClick={() => navigate("/")} 
                    >
                        Sign Out
                    </Button>
                    {update && 
                        <UpdateUser update={update} closeForm={() => setUpdate(false)} />
                    }
                </Box>
            }
        </>
    );
}
