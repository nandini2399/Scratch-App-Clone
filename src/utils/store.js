import { configureStore } from "@reduxjs/toolkit";
import spritesReducer from "./spritesSlice";

const store = configureStore({
    reducer: {
        sprites: spritesReducer
    }
})

export default store;

