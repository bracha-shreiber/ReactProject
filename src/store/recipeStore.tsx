import axios from "axios";
import { Recipe } from "../types/recipe";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const fetchRecipes = createAsyncThunk('recipe/fetch',async(_,thunkAPI) => {
    try{
        const response = await axios.get('http://localhost:3000/api/recipes');
        return response.data as Recipe[];
    }
    catch(error){
        thunkAPI.rejectWithValue(error);
    }
});

export const addRecipe = createAsyncThunk('recipe/add',async (recipe:Recipe, thunkAPI) => {
    try{
        const response = await axios.post('http://localhost:3000/api/recipes', recipe);
        return response.data as Recipe | undefined;
    }
    catch(error){
        thunkAPI.rejectWithValue(error);
    }
})
const recipeSlice = createSlice({
    name:'recipe',
    initialState: {
      recipes: [] as Recipe[] | undefined, loading:true
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchRecipes.pending, (state) =>{

        })
        .addCase(fetchRecipes.fulfilled, (state,action) => {
           state.recipes=action.payload;
        })
       .addCase(fetchRecipes.rejected, (state, action) => {})
       .addCase(addRecipe.fulfilled, (state, action) =>{
        // state.recipes?.push(action.payload);
       })
    
}
})

export const selectRecipe= (state:RootState)=>state.recipe;
export default recipeSlice;