// import { createContext, Dispatch, SetStateAction, useState } from "react";
// import Login from "./user/login";
// import UpdateUser from "./user/updateUser";
// import { Outlet, useNavigate } from "react-router-dom";
// import { AppBar, Toolbar, Button, Box } from "@mui/material";

// export const IsLoggedIn = createContext<{ LoggedIn: boolean, setLoggedIn: Dispatch<SetStateAction<boolean>> }>({
//     LoggedIn: false,
//     setLoggedIn: () => {}
// });

// export default () => {
//     const [LoggedIn, setLoggedIn] = useState<boolean>(false);
//     const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
//     const [showModal, setShowModal] = useState<boolean>(false);
//     const [update, setUpdate] = useState<boolean>(false);

//     const navigate = useNavigate();

//     return (
//         <>
//             <AppBar position="fixed" sx={{ backgroundColor: 'transparent' }}>
//                 <Toolbar>
//                     <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-start' }}>
//                         <Button 
//                             variant="contained" 
//                             sx={{ backgroundColor: '#4CAF50', color: '#FFFFFF', mr: 1 }} // Button color
//                             onClick={() => { setMode("signIn"); setLoggedIn(true); setShowModal(true); }} 
//                         >
//                             Sign In
//                         </Button>
//                         <Button 
//                             variant="contained" 
//                             sx={{ backgroundColor: '#4CAF50', color: '#FFFFFF' }} // Button color
//                             onClick={() => { setMode("signUp"); setLoggedIn(true); setShowModal(true); }} 
//                         >
//                             Sign Up
//                         </Button>
//                     </Box>
//                 </Toolbar>
//             </AppBar>
//             {LoggedIn && showModal && 
//                 <Login state={mode === "signIn"} close={() => setShowModal(false)} showModal={showModal} />
//             }
//             {LoggedIn && !showModal && 
//                 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 2 }}>
//                     <Button 
//                         variant="outlined" 
//                         color="primary" 
//                         onClick={() => setUpdate(true)} 
//                         sx={{ mb: 1 }}
//                     >
//                         Update
//                     </Button>
//                     <Button 
//                         variant="outlined" 
//                         color="error" 
//                         onClick={() => navigate("/")} 
//                     >
//                         Sign Out
//                     </Button>
//                     {update && 
//                         <UpdateUser update={update} closeForm={() => setUpdate(false)} />
//                     }
//                 </Box>

//             }
//               <Outlet/>
//         </>
//     );
// }
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import Login from "./user/login";
import UpdateUser from "./user/updateUser";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import Avatar from "./user/avatar";
import AddRecipe from "./recipes/AddRecipe";
import { IsLoggedIn, userContext } from "../App";
import { User } from "../types/user";

const HomePage = () => {
    // const [LoggedIn, setLoggedIn] = useState<boolean>(false);
    const {LoggedIn,setLoggedIn} = useContext(IsLoggedIn);
    const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
    // const [showModal, setShowModal] = useState<boolean>(false);
    const [update, setUpdate] = useState<boolean>(false);
    const { userDispatch } = useContext(userContext);
    const navigate = useNavigate();
    const[sign,setSign]=useState<boolean>(false);

    return (
        <>
            {/* <AppBar position="fixed" sx={{ backgroundColor: 'transparent' }}>
                <Toolbar>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: '1' }}>
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
            </AppBar> */}
            {!LoggedIn&&<button onClick={() =>{setSign(true);setMode('signIn')} }>sign in</button>}
           {!LoggedIn&&<button onClick={() =>{setSign(true);setMode('signUp')}}>sign up</button>}
            {sign&&<Login state={mode==="signIn"} setClose={setSign}></Login>}
            {LoggedIn &&
                <button
                    onClick={() => setUpdate(true)}
                >
                    Update
                </button> }
                {update &&
                <UpdateUser update={update} closeForm={() => setUpdate(false)} />
            } 
            {LoggedIn&&<Avatar></Avatar>}
                {LoggedIn&&
                <button
                    onClick={() => {
                        navigate("/"); setLoggedIn(false); userDispatch(
                            {
                                type: "LOGOUT",
                                data: {} as User
                            }
                        )
                    }}
                >
                    Sign Out
                </button>}
           
            {/* <button onClick={() => { setMode("signIn"); setLoggedIn(true); setShowModal(true); }}>sign in</button>
            <button onClick={() => { setMode("signUp"); setLoggedIn(true); setShowModal(true); }}>sign up</button>
            {LoggedIn && !showModal && <Avatar></Avatar>}
            {LoggedIn && showModal &&
                <Login state={mode === "signIn"} close={() => setShowModal(false)} showModal={showModal} />
            }
            {LoggedIn && !showModal &&
                <button
                    onClick={() => setUpdate(true)}
                >
                    Update
                </button> }
                {LoggedIn&&!showModal&&
                <button

                    onClick={() => {
                        navigate("/"); setLoggedIn(false); userDispatch(
                            {
                                type: "LOGOUT",
                                data: {} as User
                            }
                        )
                    }}
                >
                    Sign Out
                </button>}
            {update &&
                <UpdateUser update={update} closeForm={() => setUpdate(false)} />
            } */}

            {/* <Outlet /> */}

            {/* <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start', // Align items to the start (left)
                    justifyContent: 'flex-start', // Justify items to the start (top)
                    height: '100vh', // Full height of the viewport
                    padding: 2, // Padding for spacing
                    marginTop: '64px' // Adjust margin to account for the AppBar height
                }}
            >
                {LoggedIn && showModal &&
                    <Login state={mode === "signIn"} close={() => setShowModal(false)} showModal={showModal} />
                }
                {LoggedIn && !showModal && <Avatar></Avatar>}
                {LoggedIn && !showModal &&
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
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
                            onClick={() => { navigate("/"); setLoggedIn(false); userDispatch(
                                {
                                    type: "LOGOUT",
                                    data: {} as User
                                }
                            )}}
                        >
                            Sign Out
                        </Button>
                        {update &&
                            <UpdateUser update={update} closeForm={() => setUpdate(false)} />
                        }
                    </Box>
                }
                <Outlet />
            </Box> */}
        </>
    );
}

export default HomePage;
