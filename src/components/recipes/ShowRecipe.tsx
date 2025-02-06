
import { Box, Typography, List, ListItem } from "@mui/material";
import { Recipe } from "../../types/recipe";

const ShowRecipe = ({ recipe }: { recipe: Recipe | undefined }) => {
    if (!recipe) {
        return (
            <Box sx={{ padding: 2 }}>
                <Typography variant="h6">Please select a recipe to view details.</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                padding: 2,
                position: 'fixed',
                left: '3%',
                top: '15%',
                width: '30%',
                bottom: '2%',
                maxHeight: '80%', // Set a maximum height
                overflowY: 'auto', // Enable vertical scrolling
                overflowX: 'hidden',
            }}
        >
            <Typography variant="h3">{recipe.title}</Typography>
            <Typography variant="body1">{recipe.description}</Typography>
            <Typography variant="body2">ID of author: {recipe.authorId}</Typography>
            <List>
                {recipe.ingredients?.map((ingredient, index) => (
                    <ListItem key={index}>{ingredient.toString()}</ListItem>
                ))}
            </List>
            <Typography variant="body1">{recipe.instructions}</Typography>
        </Box>

    );
}

export default ShowRecipe;
