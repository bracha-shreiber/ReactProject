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
import { setError } from "../../store/ErrorSlice";
import axios from "axios";

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
        } finally {
            setAdded(false);
        }
    }

    return (
        <>
            {added &&
                <Box component="form" onSubmit={handleSubmit(OnSubmit)} sx={{ padding: 2 }} position={'fixed'} top={'15%'} width={'40%'} right={'30%'}>
                    <TextField label="Title" {...register("title")} error={!!errors.title} helperText={errors.title ? errors.title.message : ""} fullWidth />
                    <TextField label="Description" {...register("description")} error={!!errors.description} helperText={errors.description ? errors.description.message : ""} fullWidth />
                    {fields.map((item, index) => (
                        <div key={item.id}>
                            <TextField sx={{color:"red"}} label="Ingredient" {...register(`ingredients.${index}.name`)} error={!!errors.ingredients?.[index]?.name} helperText={errors.ingredients?.[index]?.name ? errors.ingredients[index].name.message : "" } />
                            <Button type="button" onClick={() => remove(index)} sx={{ backgroundColor: 'white', color: 'red' }}>Remove</Button>
                        </div>
                    ))}
                    <Button type="button" onClick={() => append({ name: "" })} sx={{ backgroundColor: 'red', color: 'white' }}>Add Ingredient</Button>
                    <TextField label="Instructions" {...register("instructions")} error={!!errors.instructions} helperText={errors.instructions ? errors.instructions.message : ""} fullWidth />
                    <Button type="submit" sx={{ backgroundColor: 'white', color: 'red' }}>Add</Button>
                </Box>}
        </>
    );
}
