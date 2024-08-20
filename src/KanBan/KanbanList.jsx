import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDosKanbanAtom } from "../atom";
import DroppableCard from "./droppableCard";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap:10px;
`;

export default function KanbanList() {
  const [toDos, setToDos] = useRecoilState(toDosKanbanAtom);
  
  const handleDrag = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      setToDos(prev => {
        const copyToDo = [...prev[source.droppableId]];
        const sourceItem = copyToDo.splice(source.index, 1)[0];
        copyToDo.splice(destination.index, 0, sourceItem);
        return {
          ...prev,
          [source.droppableId]: copyToDo,
        }
      })
    } else {
      const sourceToDo = [...toDos[source.droppableId]];
      const sourceItem = sourceToDo.splice(source.index, 1)[0];
      const destinationToDo = [...toDos[destination.droppableId]];
      destinationToDo.splice(destination.index, 0, sourceItem);
      setToDos({
        ...toDos,
        [source.droppableId]: sourceToDo,
        [destination.droppableId]: destinationToDo
      });
    }
  };

  return (
    <Container>
      <DragDropContext onDragEnd={handleDrag}>
        <Wrapper>
          {Object.keys(toDos).map(toDoState =>
            <DroppableCard key={toDoState} droppableId={toDoState} />
          )}
        </Wrapper>
      </DragDropContext>
    </Container>
  );
}