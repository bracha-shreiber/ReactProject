import { useContext } from "react";
import { useForm } from "react-hook-form";
import AppLayout, { url, userContext } from "../../AppLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Modal, TextField, Button, Typography } from "@mui/material";
import { IsLoggedIn } from "../homePage";

export default ({ state, close, showModal }: { state: boolean, close: Function, showModal: boolean }) => {
    const { user, userDispatch } = useContext(userContext);
    const { setLoggedIn } = useContext(IsLoggedIn);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate(); 

    const onSubmit = async (userData: any) => {
        try {
            const str = url + '/' + (state === true ? "login" : "register");
            const res = await axios.post(str, {
                email: userData.email,
                password: userData.password
            });
            console.log(res);

            if (res.data.user) {
                userDispatch({
                    type: "LOGIN",
                    data: res.data.user
                });
                setLoggedIn(true); // Update the login state
            } else {
                userDispatch({
                    type: "LOGIN",
                    data: {
                        id: +res.data.id,
                        email: userData.email,
                        password: userData.password
                    }
                });
                setLoggedIn(true);
            }
        } catch (error) {
            setLoggedIn(false);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || "Unknown error";
                if (errorMessage === "Invalid credentials") {
                    alert("Error: " + errorMessage);
                    navigate("/home");
                    return;
                }
                console.error("Error response:", error.response);
            } else {
                console.error("Error:", error);
                alert("Error: Unexpected error");
            }
        } finally {
            close();
            console.log("i closed");
        }
    };

    return (
        <Modal open={showModal} onClose={() => close()}>
             <Box sx={{ width: 300, padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '10%' }}>
            
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    {state ? "Login" : "Register"}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField 
                        variant="outlined"
                        label="Email"
                        type="text"
                        fullWidth
                        margin="normal"
                        {...register("email", { required: true })} 
                        error={!!errors.email}
                        helperText={errors.email ? "This field is required" : ""}
                    />
                    <TextField 
                        variant="outlined"
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        {...register("password", { required: true })} 
                        error={!!errors.password}
                        helperText={errors.password ? "This field is required" : ""}
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        {state ? "Login" : "Register"}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}


// import { useContext } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { Modal } from "@mui/material";
// import { IsLoggedIn } from "../homePage"; // Adjust the import path as necessary
// import { url } from "../../AppLayout";

// export default ({ state, close, showModal}: { state: boolean, close: Function, showModal: boolean}) => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const {  setLoggedIn } = useContext(IsLoggedIn);

//     const onSubmit = async (userData: any) => {
//         try {
//             const endpoint = state ? "login" : "register";
//             const res = await axios.post(`${url}/${endpoint}`, {
//                 email: userData.email,
//                 password: userData.password
//             });

//             if (res.data.user) {
                
//             }
//         } catch (error) {
//             // Handle errors...
//         } finally {
//             close();
//         }
//     };

//     return (
//         <Modal open={showModal}>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <input 
//                     type="text" 
//                     placeholder="Enter your email" 
//                     {...register("email", { required: true })} 
//                 />
//                 {errors.email && <span>This field is required</span>}

//                 <input 
//                     type="password" 
//                     placeholder="Enter your password" 
//                     {...register("password", { required: true })} 
//                 />
//                 {errors.password && <span>This field is required</span>}

//                 <button type="submit">Login</button>
//             </form>
//         </Modal>
//     );
// };
