import { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { IsLoggedIn, url, userContext } from "../../App";
import { User } from "../../types/user";

export default ({ state ,setClose}: { state: boolean, setClose:Function}) => {
    const { user,userDispatch } = useContext(userContext);
    const { setLoggedIn } = useContext(IsLoggedIn);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate(); 
    const onSubmit =  async (userData: any) => {
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
                        id: +res.data.userId,
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
                console.error("Error response:", error.response?.data?.message);
            } else {
                console.error("Error:", error);
                alert("Error: Unexpected error");
            }
        } finally {
            setClose(false);
            console.log("i closed");
        }
    };

    return (
        <Dialog open={true} onClose={()=>setClose(false)}>
        <DialogTitle>{state ? "SignIn" : "SignUp"}</DialogTitle>
        <DialogContent>
             <Box sx={{ width: 300, padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '10%' }}>
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
            </DialogContent>
            </Dialog>
    );
}
