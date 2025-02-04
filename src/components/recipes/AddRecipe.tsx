// import { useForm, useFieldArray } from "react-hook-form";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../store/store";
// import { addRecipe, fetchRecipes } from "../../store/recipeStore";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { array, object, string } from "yup";
// import { useContext, useState } from "react";
// import { userContext } from "../../App";
// import { useNavigate } from "react-router-dom";

// export default () => {
//     const [added,setAdded]=useState<boolean>(true);
//     const schema = object({
//         title: string().required(),
//         description: string().required(),
//         ingredients: array().of(object({
//             name: string().required() 
//         })).required(),
//         instructions: string().required()
//     }).required();

//     const { reset,control, register, handleSubmit, formState: { errors } } = useForm({
//         resolver: yupResolver(schema)
//     });
// const navigate = useNavigate();
//     const { fields, append, remove } = useFieldArray({
//         control, 
//         name: "ingredients" 
//     });

//     const dispatch = useDispatch<AppDispatch>();
//     const { user } = useContext(userContext);

//     const OnSubmit = async (data: any) => {
//         try {
//             await dispatch(addRecipe({
//                 ...data,
//                 authorId: user.id
//             })).unwrap();
//             dispatch(fetchRecipes()); 
//             reset();
//             navigate('/recipes');
//         } catch (error) {
//             console.error("Failed to add recipe:", error);
//         }
//         finally{setAdded(false);}
//     }

//     return (
//         <>
//         {added&&
//             <form onSubmit={handleSubmit(OnSubmit)}>
//                 <input type="text" {...register("title")} placeholder="Title" />
//                 {errors.title && <p>{errors.title.message}</p>}
                
//                 <input type="text" {...register("description")} placeholder="Description" />
//                 {errors.description && <p>{errors.description.message}</p>}
                
//                 {fields.map((item, index) => (
//                     <div key={item.id}>
//                         <input
//                             type="text"
//                             {...register(`ingredients.${index}.name`)} // Use the array structure
//                             placeholder="Enter ingredient"
//                         />
//                         <button type="button" onClick={() => remove(index)}>Remove</button>
//                     </div>
//                 ))}
//                 <button type="button" onClick={() => append({ name: "" })}>Add Ingredient</button>
                
//                 <input type="text" {...register("instructions")} placeholder="Instructions" />
//                 {errors.instructions && <p>{errors.instructions.message}</p>}
                
//                 <button type="submit">Add</button>
//             </form>
// }
//         </>
//     );
// }
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addRecipe, fetchRecipes } from "../../store/recipeStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { array, object, string } from "yup";
import { useContext, useState } from "react";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box } from "@mui/material";

export default () => {
    const [added, setAdded] = useState<boolean>(true);
    const schema = object({
        title: string().required(),
        description: string().required(),
        ingredients: array().of(object({
            name: string().required()
        })).required(),
        instructions: string().required()
    }).required();

    const { reset, control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients"
    });

    const dispatch = useDispatch<AppDispatch>();
    const { user } = useContext(userContext);

    const OnSubmit = async (data: any) => {
        try {
            await dispatch(addRecipe({
                ...data,
                authorId: user.id
            })).unwrap();
            dispatch(fetchRecipes());
            reset();
            navigate('/recipes');
        } catch (error) {
            console.error("Failed to add recipe:", error);
        } finally {
            setAdded(false);
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit(OnSubmit)} sx={{ padding: 2 }}>
            <TextField label="Title" {...register("title")} error={!!errors.title} helperText={errors.title ? errors.title.message : ""} fullWidth />
            <TextField label="Description" {...register("description")} error={!!errors.description} helperText={errors.description ? errors.description.message : ""} fullWidth />
            {fields.map((item, index) => (
                <div key={item.id}>
                    <TextField label="Ingredient" {...register(`ingredients.${index}.name`)} error={!!errors.ingredients?.[index]?.name} helperText={errors.ingredients?.[index]?.name ? errors.ingredients[index].name.message : ""} />
                    <Button type="button" onClick={() => remove(index)}>Remove</Button>
                </div>
            ))}
            <Button type="button" onClick={() => append({ name: "" })}>Add Ingredient</Button>
            <TextField label="Instructions" {...register("instructions")} error={!!errors.instructions} helperText={errors.instructions ? errors.instructions.message : ""} fullWidth />
            <Button type="submit">Add</Button>
        </Box>
    );
}
