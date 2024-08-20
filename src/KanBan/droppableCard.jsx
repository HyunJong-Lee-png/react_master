import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./draggableCard";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDosKanbanAtom } from "../atom";
import { useRef } from "react";
import { nanoid } from "nanoid";


const DropContainer = styled.ul`
  border-radius: 15px;
  background-color: ${props => props.isDraggingOver ? '#433D8B' : props.draggingFrom ? '#4C3BCF' : '#3FA2F6'};
  padding: 10px;
  min-height: 200px;
  text-align: center;
  transition: background-color 0.2s ease-in-out;
`;

export default function DroppableCard({ droppableId }) {
  const [toDos, setToDos] = useRecoilState(toDosKanbanAtom);
  const input = useRef();

  const handleSubmit = (toDoState) => {
    const inputTag = input.current;
    if (!inputTag.value) return;
    setToDos(prev => {
      return {
        ...prev,
        [toDoState]: [...prev[toDoState], { id: nanoid(), text: inputTag.value }]
      }
    });
    inputTag.value = '';
    inputTag.focus();
  };

  return (
    <Droppable droppableId={droppableId}>
      {(magic, snapshot) =>
        <DropContainer
          ref={magic.innerRef}
          {...magic.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
          draggingFrom={snapshot.draggingFromThisWith}
        >
          {droppableId}
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(droppableId);
          }}>
            <input placeholder="what to do" ref={input}></input>
            <button>확인</button>
          </form>
          {toDos[droppableId].map((todo, index) =>
            <DraggableCard todo={todo} index={index} key={todo.id} />)}
          {magic.placeholder}
        </DropContainer>
      }
    </Droppable>
  );
}