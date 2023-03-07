import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { OperatorsArray } from "../../components/elements/Operators/Operators"

export interface ComputeState {
  display: string
  mode: "constructor" | "runtime"
  // after computing result will be removed
  clearOnType: boolean
}

const initialState: ComputeState = {
  display: "0",
  mode: "constructor",
  clearOnType: false,
}

export const computeSlice = createSlice({
  name: "compute",
  initialState,
  reducers: {
    drawDisplay: (state, action: PayloadAction<string>) => {
      state.display = action.payload
    },
    addToDisplay: (state, action: PayloadAction<string>) => {
      if (state.clearOnType && !OperatorsArray.includes(action.payload)) {
        state.display = action.payload
      } else {
        state.display += action.payload
      }
      state.clearOnType = false
    },
    clearDisplay: (state) => {
      state.display = "0"
      state.clearOnType = false
    },
    toggleMode: (state) => {
      state.mode = state.mode === "constructor" ? "runtime" : "constructor"
    },
    setClearOnType: (state, action: PayloadAction<boolean>) => {
      state.clearOnType = action.payload
    },
  },
})

export const {
  setClearOnType,
  toggleMode,
  drawDisplay,
  clearDisplay,
  addToDisplay,
} = computeSlice.actions

export const selectCompute = (state: RootState) => state.compute

export default computeSlice.reducer
