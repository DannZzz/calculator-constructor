import React from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { useAppSelector } from "../../../app/hooks"
import { selectCompute } from "../../../features/compute/computeSlice"
import { getItemStyle } from "../../../util/util"
import Controls from "../Controls/Controls"
import Display from "../Display/Display"
import Numbers from "../Numbers/Numbers"
import Operators from "../Operators/Operators"
import "./Elements.scss"

export const ElementsList = {
  Display,
  Operators,
  Numbers,
  Controls,
}

export type ElementType = keyof typeof ElementsList

export interface ElementView {
  untouchable?: boolean
  static?: boolean
}

const ElementsAsArray = Object.entries(ElementsList) as Array<
  [ElementType, typeof ElementsList[ElementType]]
>

const Elements: React.FC<{ elements: ElementType[] }> = ({ elements }) => {
  const { mode } = useAppSelector(selectCompute)

  return (
    <Droppable droppableId="static" isDropDisabled>
      {(provided) => (
        <div ref={provided.innerRef} style={{}} className="elements">
          {ElementsAsArray.map(([key, Component], i) => (
            <Draggable
              isDragDisabled={mode === "runtime" || elements.includes(key)}
              key={key}
              draggableId={key}
              index={i}
            >
              {(provided, snapshot) => (
                <Component
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                  view={{ static: true, untouchable: elements.includes(key) }}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default Elements
