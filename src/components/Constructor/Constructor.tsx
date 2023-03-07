import classNames from "classnames"
import React from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { getItemStyle } from "../../util/util"
import { ElementsList, ElementType } from "../elements/Elements/Elements"
import { RiImageAddFill } from "react-icons/ri"
import "./Constructor.scss"
import Mode from "../Mode/Mode"
import { useAppSelector } from "../../app/hooks"
import { selectCompute } from "../../features/compute/computeSlice"

const Constructor: React.FC<{
  elements: ElementType[]
  removeElement: (key: ElementType) => void
}> = ({ elements, removeElement }) => {
  const { mode } = useAppSelector(selectCompute)
  const active = mode === "constructor"

  return (
    <Droppable droppableId="constructor">
      {(provided) => (
        <div
          className="constructor"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <Mode />
          <div
            className={classNames("preview", {
              empty: elements.length === 0 && active,
            })}
          >
            {elements.map((elementType, index) => {
              const Component = ElementsList[elementType]
              return (
                <Draggable
                  isDragDisabled={!active}
                  key={elementType}
                  draggableId={elementType + 1}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Component
                      {...{ onDoubleClick: () => removeElement(elementType) }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    />
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
            {active && elements.length === 0 && (
              <div className="add-title">
                <RiImageAddFill size="30px" />
                <h3>Претащите сюда</h3>
                <span>
                  любой элемент
                  <br />
                  из левой панели
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </Droppable>
  )
}

export default Constructor
