import { useContext, useEffect, useState } from "react";
import { Recipe } from "../../types/recipe";
import { AppDispatch, RootState } from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import { fetchRecipes } from "../../store/recipeStore";
import ShowRecipe from "./ShowRecipe";
import AddRecipe from "./AddRecipe";
import { IsLoggedIn } from "../../App";


export default ()=>{
    const dispatch = useDispatch<AppDispatch>();
    const recipes = useSelector((state:RootState)=>state.recipes.recipes);
    const [viewRecipe, setViewRecipe] = useState<boolean>(false);
    const [keepRecipe,setKeepRecipe] = useState<Recipe>();
    const [addRecipe,setAddRecipe] = useState<boolean>(false);
    const handleRecipe = (id:number)=>{
        setKeepRecipe(recipes?.find(r=>r.id==id));
        setViewRecipe(true);
    }
    useEffect(()=>{
        dispatch(fetchRecipes());
    },[dispatch]);
    const {LoggedIn,} = useContext(IsLoggedIn);
    return (<>
    {recipes?.map((r :Recipe)=><div key={r.id}>
        <a href="#" onClick={()=>handleRecipe(r.id)}>{r.title}</a></div>)}
        {viewRecipe&&<ShowRecipe recipe={keepRecipe}></ShowRecipe>}
        {LoggedIn&&<button onClick={()=>{setAddRecipe(true)}}>Add Recipe</button>}
        {addRecipe&&<AddRecipe></AddRecipe>}
    </>)
}