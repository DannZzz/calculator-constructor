import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface ComputeState {
  display: string
  mode: "constructor" | "runtime"
}

const initialState: ComputeState = {
  display: "0",
  mode: "constructor",
}

export const computeSlice = createSlice({
  name: "compute",
  initialState,
  reducers: {
    drawDisplay: (state, action: PayloadAction<string>) => {
      state.display = action.payload
    },
    addToDisplay: (state, action: PayloadAction<string>) => {
      state.display += action.payload
    },
    clearDisplay: (state) => {
      state.display = "0"
    },
    toggleMode: (state) => {
      state.mode = state.mode === "constructor" ? "runtime" : "constructor"
    },
  },
})

export const { toggleMode, drawDisplay, clearDisplay, addToDisplay } =
  computeSlice.actions

export const selectCompute = (state: RootState) => state.compute

export default computeSlice.reducer
