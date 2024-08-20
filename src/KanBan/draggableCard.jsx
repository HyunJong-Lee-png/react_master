import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const DragContainer = styled.li`
  border-radius: 15px;
  background-color: ${props => props.isDragging ? '#0F67B1' : '#ABD9FF'};
  margin-bottom: 10px;
`;

export default memo(function DraggableCard({ todo, index }) {

  return (
    <Draggable draggableId={todo.id} index={index}  >
      {(magic, snapshot) =>
        <DragContainer
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
          isDragging={snapshot.isDragging}
        >
          {todo.text}
        </DragContainer>}
    </Draggable>
  );
});