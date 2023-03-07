import classNames from "classnames"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  clearDisplay,
  drawDisplay,
  selectCompute,
  setClearOnType,
} from "../../../features/compute/computeSlice"
import { ElementView } from "../Elements/Elements"
import { OperatorsArray, OperatorsList } from "../Operators/Operators"
import "./Controls.scss"

const Controls = React.forwardRef<any, { style?: any; view?: ElementView }>(
  (props, ref) => {
    const { style, view = {}, ...otherProps } = props
    const dispatch = useAppDispatch()
    const { mode, display } = useAppSelector(selectCompute)

    function action(type: "clear" | "remove" | "equals") {
      if (view.static || mode === "constructor") return

      switch (type) {
        case "clear":
          return dispatch(clearDisplay())

        case "remove": {
          if (display === "0") return
          if (display.length === 1) return dispatch(clearDisplay())
          dispatch(setClearOnType(false))
          return dispatch(drawDisplay(display.slice(0, display.length - 1)))
        }

        case "equals": {
          const lastSymbol = display.at(-1)
          const numbers = display.split(/[+/×-]/g)
          if (
            [...OperatorsArray, ","].includes(lastSymbol) ||
            numbers.length === 1
          ) {
            return
          }
          let operation = ""

          for (let i = 0; i < display.length; i++) {
            const value = display[i]
            if (value === ",") {
              operation += "."
            } else if (value in OperatorsList) {
              operation += OperatorsList[value]
            } else {
              operation += value
            }
          }

          const result = `${eval(operation)}`

          dispatch(drawDisplay(result.replace(".", ",")))
          dispatch(setClearOnType(true))
          return
        }
      }
    }

    return (
      <div
        ref={ref}
        {...otherProps}
        style={style || {}}
        className={classNames("controls", { untouchable: view.untouchable })}
      >
        <div
          onClick={() => action("clear")}
          className={classNames("controller clear", {
            clickable: !view.static,
          })}
        >
          C
        </div>
        <div
          onClick={() => action("remove")}
          className={classNames("controller remove", {
            clickable: !view.static,
          })}
        >
          {"<"}
        </div>
        <div
          onClick={() => action("equals")}
          className={classNames("controller equals", {
            clickable: !view.static,
          })}
        >
          =
        </div>
      </div>
    )
  }
)

export default Controls
