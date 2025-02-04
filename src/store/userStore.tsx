import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types/user";
import { RootState } from "./store";


// יוצר פעולה לבדוק אם משתמש קיים
export const checkUserExists = createAsyncThunk(
    'user/checkUserExists',
    async ({ email, password }: { email: string; password: string }) => {
        const response = await fetch(`http://localhost:3000/api/user?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
            method: 'GET', // או 'POST' אם אתה רוצה לשלוח בגוף הבקשה
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('User does not exist');
        }
        return await response.json();
    }
);

// יוצר פעולה להוסיף משתמש חדש
export const addUser = createAsyncThunk(
    'user/addUser',
    async (userData: { username: string; password: string }) => {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
        return await response.json();
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {user: null as User | null,loading:true} ,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkUserExists.pending, (state) => {
                state.loading = true;
                
            })
            .addCase(checkUserExists.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(checkUserExists.rejected, (state, action) => {
                state.loading = false;
                // state.error = action.error.message || 'Error';
            })
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                // state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                // state.user?.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                // state.error = action.error.message || 'Error';
            });
    },
});

export const selectUser= (state:RootState)=>state.user;

export default userSlice.reducer;
