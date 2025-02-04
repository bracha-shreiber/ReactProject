import axios from "axios";
import { Recipe } from "../types/recipe";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const fetchRecipes = createAsyncThunk('recipes/fetch',async(_,thunkAPI) => {
    try{
        const response = await axios.get('http://localhost:3000/api/recipes');
        return response.data as Recipe[];
    }
    catch(error){
        return thunkAPI.rejectWithValue((error as Error).message)
    }
});

export const addRecipe = createAsyncThunk('recipe/add',async (recipe:Recipe, thunkAPI) => {
    try{
        console.log(recipe);
        const response = await axios.post('http://localhost:3000/api/recipes', 
        {
           title:recipe.title,
           description:recipe.description,
           ingredients:recipe.ingredients,
           instructions:recipe.instructions,
        },{
            headers: {
                'user-id':recipe.authorId
            }
        })
        return response.data;
    }
    catch(error){
        return thunkAPI.rejectWithValue((error as Error).message);
    }
})
const recipeSlice = createSlice({
    name:'recipes',
    initialState: {
      recipes: [] as Recipe[], loading:true
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // .addCase(fetchRecipes.pending, (state) =>{

        // })
        .addCase(fetchRecipes.fulfilled, (state,action) => {
            console.log('fulfilled');
           state.recipes=action.payload;
        })
       .addCase(fetchRecipes.rejected, (state, action) => {
        console.log('failed');
        
       })
       .addCase(addRecipe.fulfilled, (state, action) =>{
        
         state.recipes.push(action.payload);
       })
       .addCase(addRecipe.rejected, (state, action) => {
        console.log('failed to add recipe', action.payload);
       })
}
})

//export const selectRecipe= (state:RootState)=>state.recipe;
export default recipeSlice;