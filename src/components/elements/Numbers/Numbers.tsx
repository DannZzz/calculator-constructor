import classNames from "classnames"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  addToDisplay,
  drawDisplay,
  selectCompute,
} from "../../../features/compute/computeSlice"
import { ElementView } from "../Elements/Elements"
import { OperatorsArray } from "../Operators/Operators"
import "./Numbers.scss"

const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ","]

const Numbers = React.forwardRef<any, { style?: any; view?: ElementView }>(
  (props, ref) => {
    const { display, mode } = useAppSelector(selectCompute)
    const { style, view = {}, ...otherProps } = props
    const dispatch = useAppDispatch()

    function handleNumberClick(
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) {
      if (view.static || mode === "constructor") return
      const target = event.currentTarget
      console.log(target.id, display)
      const lastNumber = display.split(/[+/x-]/g).at(-1)

      if (target.id !== "," && target.id !== "0") {
        if (display === "0") {
          dispatch(drawDisplay(target.id))
        } else {
          dispatch(addToDisplay(target.id))
        }
      } else if (target.id === ",") {
        if ([...OperatorsArray, ","].includes(display.at(-1))) {
          return
        }
        if (lastNumber.includes(",")) {
          return
        }
        dispatch(addToDisplay(target.id))
      } else {
        if (lastNumber === "0") {
          return
        }
        dispatch(addToDisplay(target.id))
      }
    }

    return (
      <div
        ref={ref}
        {...otherProps}
        style={style}
        className={classNames("numbers", { untouchable: view.untouchable })}
      >
        {buttons.map((label, i) => (
          <div
            key={i}
            onClick={handleNumberClick}
            id={label + ""}
            className={classNames(
              "number",
              { clickable: !view.static },
              { zero: label === 0 }
            )}
          >
            {label}
          </div>
        ))}
      </div>
    )
  }
)

export default Numbers
