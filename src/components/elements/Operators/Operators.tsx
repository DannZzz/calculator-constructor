import classNames from "classnames"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  addToDisplay,
  selectCompute,
} from "../../../features/compute/computeSlice"
import { ElementView } from "../Elements/Elements"
import "./Operators.scss"

export const OperatorsList = {
  "/": "/",
  "×": "*",
  "+": "+",
  "-": "-",
}

export const OperatorsArray = Object.keys(OperatorsList)

const Operators = React.forwardRef<any, { style?: any; view?: ElementView }>(
  (props, ref) => {
    const { style, view = {}, ...otherProps } = props
    const { display, mode } = useAppSelector(selectCompute)
    const dispatch = useAppDispatch()

    function onClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      if (view.static || mode === "constructor") return
      const target = event.currentTarget
      const last = display.at(-1)
      if ([...OperatorsArray, ","].includes(last)) return
      dispatch(addToDisplay(target.id))
    }

    return (
      <div
        ref={ref}
        {...otherProps}
        style={style}
        className={classNames("operators", { untouchable: view.untouchable })}
      >
        {OperatorsArray.map((operator) => (
          <div
            id={operator}
            key={operator}
            onClick={onClick}
            className={classNames("operator", { clickable: !view.static })}
          >
            {operator}
          </div>
        ))}
      </div>
    )
  }
)

export default Operators
