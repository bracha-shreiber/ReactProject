// import { useContext, useState } from "react";
// import Login from "./user/login";
// import UpdateUser from "./user/updateUser";
// import { useNavigate } from "react-router-dom";
// import Avatar from "./user/avatar";
// import { IsLoggedIn, userContext } from "../App";
// import { User } from "../types/user";

// const HomePage = () => {
//     const { LoggedIn, setLoggedIn } = useContext(IsLoggedIn);
//     const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
//     const [update, setUpdate] = useState<boolean>(false);
//     const { userDispatch } = useContext(userContext);
//     const navigate = useNavigate();
//     const [sign, setSign] = useState<boolean>(false);

//     return (
//         <>
//             {!LoggedIn && <button onClick={() => { setSign(true); setMode('signIn') }}>sign in</button>}
//             {!LoggedIn && <button onClick={() => { setSign(true); setMode('signUp') }}>sign up</button>}
//             {sign && <Login state={mode === "signIn"} setClose={setSign}></Login>}
//             {LoggedIn &&
//                 <button
//                     onClick={() => setUpdate(true)}
//                 >
//                     Update
//                 </button>}
//             {update &&
//                 <UpdateUser update={update} closeForm={() => setUpdate(false)} />
//             }
//             {LoggedIn && <Avatar></Avatar>}
//             {LoggedIn &&
//                 <button
//                     onClick={() => {
//                         navigate("/"); setLoggedIn(false); userDispatch(
//                             {
//                                 type: "LOGOUT",
//                                 data: {} as User
//                             }
//                         )
//                     }}
//                 >
//                     Sign Out
//                 </button>}
//         </>
//     );
// }

// export default HomePage;
import { Button, Box } from "@mui/material";
import Login from "./user/login";
import UpdateUser from "./user/updateUser";
import { useNavigate } from "react-router-dom";
import Avatar from "./user/avatar";
import { IsLoggedIn, userContext } from "../App";
import { User } from "../types/user";
import { useContext, useState } from "react";

const HomePage = () => {
    const { LoggedIn, setLoggedIn } = useContext(IsLoggedIn);
    const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
    const [update, setUpdate] = useState<boolean>(false);
    const { userDispatch } = useContext(userContext);
    const navigate = useNavigate();
    const [sign, setSign] = useState<boolean>(false);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 2 }}>
            {!LoggedIn && (
                <>
                    <Button variant="contained" onClick={() => { setSign(true); setMode('signIn') }}>Sign In</Button>
                    <Button variant="contained" onClick={() => { setSign(true); setMode('signUp') }}>Sign Up</Button>
                </>
            )}
            {sign && <Login state={mode === "signIn"} setClose={setSign}></Login>}
            {LoggedIn && <Button variant="contained" onClick={() => setUpdate(true)}>Update</Button>}
            {update && <UpdateUser update={update} closeForm={() => setUpdate(false)} />}
            {LoggedIn && <Avatar />}
            {LoggedIn && (
                <Button variant="contained" onClick={() => {
                    navigate("/"); setLoggedIn(false); userDispatch({ type: "LOGOUT", data: {} as User });
                }}>Sign Out</Button>
            )}
        </Box>
    );
}

export default HomePage;

