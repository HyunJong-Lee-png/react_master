import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState, } from "recoil";
import { categoryAtom, toDosAtom, toDosSelector } from "../atom";

const ToDoList = ({ id, text, category }) => {
  const setToDos = useSetRecoilState(toDosAtom);
  const handleClick = (categorys) => {
    setToDos(prev => prev.map(todo => todo.id === id ? { id, text, category: categorys, } : todo));
  }
  return (
    <li>{text}
      {category !== 'toDo' && <button onClick={() => handleClick('toDo')}>toDo</button>}
      {category !== 'Doing' && <button onClick={() => handleClick('Doing')}>Doing</button>}
      {category !== 'Done' && <button onClick={() => handleClick('Done')}>Done</button>}
    </li>
  );
}

export default function ToDo() {
  const { register, handleSubmit, setValue } = useForm();
  const setToDos = useSetRecoilState(toDosAtom);
  // const [toDo, doing, done] = useRecoilValue(toDosSelector);
  const toDos = useRecoilValue(toDosSelector);
  const [category, setCategory] = useRecoilState(categoryAtom);

  const onSubmit = ({ toDo }) => {
    setToDos((prev) => [...prev, { id: Date.now(), text: toDo, category, }]);
    setValue('toDo', '');
  };

  const handleInput = (e) => {
    const { target: { value } } = e;
    setCategory(value);
  }

  return (
    <>
      <select value={category} onInput={handleInput}>
        <option value={'toDo'}>ToDo</option>
        <option value={'Doing'}>Doing</option>
        <option value={'Done'}>Done</option>
      </select>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('toDo')} placeholder="Write to Do" />
        <button>submit</button>
      </form>
      <hr />
      <ul>
        {toDos.map(todo => <ToDoList key={todo.id}{...todo} />)}
      </ul>
    </>
  );
}