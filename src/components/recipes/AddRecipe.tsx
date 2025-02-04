import { useForm ,useFieldArray} from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import axios from "axios";
import { addRecipe } from "../../store/recipeStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { array, object, string } from "yup";
import { Recipe } from "../../types/recipe";
import { useContext } from "react";
import { userContext } from "../../App";

export default () =>{
    const schema = object({
        title: string().required(),
        description: string().required(),
        ingredients:array().required(),
        instructions: string().required()
    }).required()
    const { fields, append, remove } = useFieldArray({
        name: "ingredients" // שם המערך
    });
    const dispatch = useDispatch<AppDispatch>();
    const {user} = useContext(userContext);
    const {
        register,
        handleSubmit,
        formState: { errors }  
    } = useForm({ resolver: yupResolver(schema)});

    const OnSubmit = async (data: any) =>{
        try {
            await dispatch(addRecipe({
                ...data,
                authorId:user.id
            })).unwrap(); // unwrap כדי לתפוס שגיאות אם יש
        } catch (error) {
            console.error("Failed to add recipe:", error);
        }
    }
   return(
    <>
      <form onSubmit={handleSubmit(OnSubmit)}>
        <input type="text" {...register("title")}/>
        <input type="text" {...register("description")}/>
        {fields.map((item, index) => (
                <div key={item.id}>
                    <input
                        type="text"
                        {...register(`ingredients.${index}.name`)} // שימוש במערך
                        placeholder="Enter ingredient"
                    />
                    <button type="button" onClick={() => remove(index)}>Remove</button>
                </div>
            ))}
        <button type="button" onClick={() => append({ name: "" })}>Add Ingredient</button>
        <input type="text" {...register("instructions")}/>
        <button type="submit">Add</button>
      </form>
    </>
   )
}