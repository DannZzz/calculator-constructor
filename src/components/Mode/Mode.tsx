import classNames from "classnames"
import React from "react"
import { AiOutlineEye } from "react-icons/ai"
import { BiCode } from "react-icons/bi"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  clearDisplay,
  selectCompute,
  toggleMode,
} from "../../features/compute/computeSlice"
import "./Mode.scss"

const Mode = () => {
  const { mode } = useAppSelector(selectCompute)
  const dispatch = useAppDispatch()

  function toggle(_mode: typeof mode) {
    if (mode !== _mode) {
      dispatch(toggleMode())
      dispatch(clearDisplay())
    }
  }

  return (
    <div className="mode">
      <div
        onClick={() => toggle("runtime")}
        className={classNames("mode-controller", {
          selected: mode === "runtime",
        })}
      >
        <AiOutlineEye className="icon" />
        <span>Runtime</span>
      </div>
      <div
        onClick={() => toggle("constructor")}
        className={classNames("mode-controller", {
          selected: mode === "constructor",
        })}
      >
        <BiCode className="icon" />
        <span>Constructor</span>
      </div>
    </div>
  )
}

export default Mode
