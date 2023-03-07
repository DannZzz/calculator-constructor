import classNames from "classnames"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  clearDisplay,
  selectCompute,
} from "../../../features/compute/computeSlice"
import { ElementView } from "../Elements/Elements"
import "./Controls.scss"

const Controls = React.forwardRef<any, { style?: any; view?: ElementView }>(
  (props, ref) => {
    const { style, view = {}, ...otherProps } = props
    const dispatch = useAppDispatch()
    const { mode } = useAppSelector(selectCompute)

    function action(type: "clear" | "remove" | "equals") {
      if (view.static || mode === "constructor") return

      switch (type) {
        case "clear":
          return dispatch(clearDisplay())
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
