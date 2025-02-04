import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { User } from "../../types/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setError } from "../../store/ErrorSlice";
import { url, userContext } from "../../App";
export default ({update,closeForm}:{update:boolean,closeForm:()=>void}) => {
    const { user, userDispatch } = useContext(userContext);
    const [updatedUser, setUpdatedUser] = useState<User>(user);  
    const error = useSelector((state: RootState) => state.ErrorMessage);
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUpdatedUser({
        ...updatedUser,
        [e.target.name]: e.target.value,
      });
    };
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      userDispatch({
        type: 'UPDATE',
        data: updatedUser,
      });
      try {
       console.log(user);
        console.log('Sending update request with user ID:', user.id);
        const res = await axios.put(url + '/', {
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          address: updatedUser.address,
          phone: updatedUser.phone
        }, {
          headers: {
            'user-id': user.id 
          }
        });
      }
      catch (e) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          switch (status) {
            case 400:
              dispatch(setError("Bad Request: The server could not understand the request due to invalid syntax."));
              break;
            case 401:
              dispatch(setError("Unauthorized: Access is denied due to invalid credentials."));
              break;
            case 403:
              dispatch(setError("Forbidden: You do not have permission to access this resource."));
              break;
            default:
              dispatch(setError("An unexpected error occurred."));
              break;
          }
        } else {
          dispatch(setError("An unexpected error occurred."));
        }
      }
      finally {
        closeForm();
        setError('');
      }
    };
    return (
      <>
        <Modal open={update}>
          <Box sx={{ width: 300, padding: 2, backgroundColor: 'white', margin: 'auto',
            marginTop: '10%', maxHeight: '80vh', overflowY: 'auto'}}>
            <form onSubmit={handleSubmit}>
              <TextField label="First Name"
                value={updatedUser.firstName}
                name="firstName"
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Last Name"
                value={updatedUser.lastName}
                name="lastName"
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Email"
                value={updatedUser.email}
                name="email"
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                value={user.password}
                name="password"
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Address"
                value={updatedUser.address}
                name="address"
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Phone"
                value={updatedUser.phone}
                name="phone"
                onChange={handleChange}
                fullWidth
              />
              <Button type='submit' variant="contained" sx={{ marginTop: 2 }}>
                Save Changes
              </Button>
            </form>
          </Box>
        </Modal>
      </>
    );
  };