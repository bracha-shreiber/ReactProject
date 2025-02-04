import { useForm ,useFieldArray} from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import axios from "axios";
import { addRecipe } from "../../store/recipeStore";

export default () =>{
    const { fields, append, remove } = useFieldArray({
        name: "ingredients" // שם המערך
    });
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        formState: { errors }  
    } = useForm();

    const OnSubmit = async (data:any) =>{
        try {
           
            await dispatch(addRecipe(data)).unwrap(); // unwrap כדי לתפוס שגיאות אם יש
        } catch (error) {
            console.error("Failed to add recipe:", error);
        }
    }

   return(
    <>
      <form action="" onSubmit={handleSubmit(OnSubmit)}>
        <input type="text" {...register("title")}/>
        <input type="text" {...register("description")}/>
        <input type="text" {...register("authorId")}/>
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