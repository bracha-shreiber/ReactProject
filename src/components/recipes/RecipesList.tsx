
import { Box, Button, Grid, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Recipe } from "../../types/recipe";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../store/recipeStore";
import ShowRecipe from "./ShowRecipe";
import AddRecipe from "./AddRecipe";
import { IsLoggedIn } from "../../App";
import { Outlet, useNavigate } from "react-router-dom";

export default () => {
    const dispatch = useDispatch<AppDispatch>();
    const recipes = useSelector((state: RootState) => state.recipes.recipes);
    const [viewRecipe, setViewRecipe] = useState<Recipe | undefined>(undefined);
    const [addRecipe, setAddRecipe] = useState<boolean>(false);

    const handleRecipe = (id: number) => {
        setViewRecipe(recipes?.find(r => r.id === id));
    };

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const { LoggedIn } = useContext(IsLoggedIn);
    const navigate = useNavigate();
    return (
        <>
            <Outlet />
            <Box
                flex={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                padding={2}
                border={"2px solid primary"}
            >
            </Box>
            <Box
                display="flex"
                position={'fixed'}
                right={'5%'}
                top={'15%'}
                textAlign="center"
                flexDirection="column"
                alignItems="flex-end"
                padding={2}
                color="primary"
                width="200px"
                border={"2px solid primary"}
                sx={{ maxHeight: '80%', overflowY: 'auto' }} // Use sx prop for styling
            >
                {recipes?.map((r: Recipe) => (
                    <div key={r.id}>
                        <a href="#" onClick={() => handleRecipe(r.id)} style={{ color: 'red' }}>
                            {r.title}
                        </a>
                    </div>
                ))}
                {LoggedIn && (
                    <Button onClick={() => { setAddRecipe(true) }} sx={{ backgroundColor: '#FF0000', color: '#FFFFFF' }}>
                        Add Recipe
                    </Button>
                )}
                {addRecipe && <AddRecipe />}
                <Grid item xs={6}>
                    <Box padding={2} border={"2px solid primary"} sx={{ maxHeight: '50%', overflowY: 'auto' }}>
                        {viewRecipe && <ShowRecipe recipe={viewRecipe} />}
                    </Box>
                </Grid>
            </Box>
        </>
    );
}