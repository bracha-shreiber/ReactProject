import { combineSlices, configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./recipeStore"
import { ErrorMessage } from "./ErrorSlice";

const store = configureStore(
    {
        reducer: combineSlices(
            recipeSlice,
            ErrorMessage,
        )
    },
)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;