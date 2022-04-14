import { AnySrvRecord } from "dns";
import React from "react";
import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { NumberLiteralType } from "typescript";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCatogory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCatogory(event.currentTarget.value as any);
  };

  return (
    <div>
      <h1>To Do List</h1>
      <hr />
      <form>
        <select value={category} onInput={onInput}>
          <option value={Categories.TODO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </select>
      </form>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
      {/* selector에서 선택적으로 배열을 받아오기 때문에 컴포넌트 하나만 렌더링하면 됨 */}
    </div>
  );
}

export default ToDoList;
