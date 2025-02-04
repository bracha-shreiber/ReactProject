import {  createBrowserRouter} from "react-router-dom";
import AppLayout from "./components/AppLayout";
import RecipesList from "./components/recipes/RecipesList";
import About from "./components/about";
import HomePage from "./components/homePage";
import Home from "./components/home";
import AddRecipe from "./components/recipes/AddRecipe";
export const RouterApp = createBrowserRouter([
    {path:"/",element:<AppLayout></AppLayout>,
        children:[
            {path:"home",element:<Home></Home>},
            {path: "about", element: <About></About>},
            {path:"homePage", element:<HomePage></HomePage>},
            {path:"recipes", element:<RecipesList></RecipesList>,
                children:[
                    {path:"addRecipe",element:<AddRecipe></AddRecipe>}
                ]
            },
           
        ]
    }
]
)

