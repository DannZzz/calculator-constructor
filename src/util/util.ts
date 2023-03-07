export function reorder(list: any[], startIndex: number, endIndex: number) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export function getItemStyle(isDragging: boolean, draggableStyle: any) {
  return {
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    // background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...(draggableStyle || {}),
  }
}
