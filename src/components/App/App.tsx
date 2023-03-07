import React, { useState } from "react"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import { useAppSelector } from "../../app/hooks"
import { selectCompute } from "../../features/compute/computeSlice"
import { reorder } from "../../util/util"
import Constructor from "../Constructor/Constructor"
import Elements, { ElementType } from "../elements/Elements/Elements"
import "./App.scss"

function App() {
  const { mode } = useAppSelector(selectCompute)
  const [elements, setElements] = useState<ElementType[]>([])

  function onDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result
    if (!destination) {
      return
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(elements, source.index, destination.index)

      setElements(items)
    } else {
      const els = [...elements]
      els.splice(destination.index, 0, draggableId as ElementType)
      setElements(els)
    }
  }

  function removeElement(key: ElementType) {
    if (mode === "constructor")
      setElements(elements.filter((elt) => elt !== key))
  }

  return (
    <div className="App">
      <div className="container">
        <DragDropContext onDragEnd={onDragEnd}>
          <Elements elements={elements} />
          <Constructor removeElement={removeElement} elements={elements} />
        </DragDropContext>
      </div>
    </div>
  )
}

export default App
