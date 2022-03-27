import React from "react";
import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { NumberLiteralType } from "typescript";
import { categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCatogory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCatogory(event.currentTarget.value);
  };

  return (
    <div>
      <h1>To Do List</h1>
      <hr />
      <form>
        <select value={category} onInput={onInput}>
          <option value="TODO">To Do</option>
          <option value="DOING">Doing</option>
          <option value="DONE">Done</option>
        </select>
      </form>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
