import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./MaincomponentStore";
//import type { RootState } from "../../app/store";

// Define a type for the slice state
export interface MainComponentState {
  componentName: string;
}

// Define the initial state using that type
const initialState: MainComponentState = {
  componentName: "",
};

export const mainComponentslice = createSlice({
  name: "changeComponentName",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeComponent: (state, action) => {
      console.log("changeComponent");
      console.log("state : " + state.componentName);
      console.log("action : " + action.payload.componentName);
      state.componentName = action.payload.componentName;
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { changeComponent } = mainComponentslice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) =>
  state.mainComponents.componentName;
//type RootState = ReturnType<typeof store.getState>;
export default mainComponentslice.reducer;
