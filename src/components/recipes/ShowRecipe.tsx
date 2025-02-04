

import { Recipe } from "../../types/recipe";

const ShowRecipe = ({recipe}:{recipe:Recipe | undefined}) =>{
    return (<>
    
    <h1>{recipe?.title}</h1>
    <p>{recipe?.description}</p>
    <p>id of author:{recipe?.authorId}</p>
    
    <ul>
        {recipe?.ingredients.map((i,index)=><li key={index}>{i}</li>)}
    </ul>
    <p>{recipe?.instructions}</p>
    </>)
}

export default ShowRecipe;