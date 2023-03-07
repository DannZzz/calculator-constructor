import classNames from "classnames"
import React from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectCompute } from "../../../features/compute/computeSlice"
import { ElementView } from "../Elements/Elements"
import "./Display.scss"

const Display = React.forwardRef<any, { style?: any; view?: ElementView }>(
  (props, ref) => {
    const { display } = useAppSelector(selectCompute)

    const { view = {}, style, ...otherProps } = props

    return (
      <div
        {...otherProps}
        ref={ref}
        style={style || {}}
        className={classNames("display-container", {
          untouchable: view.untouchable,
        })}
      >
        <div className="display">{view.static ? "0" : display}</div>
      </div>
    )
  }
)

export default Display
