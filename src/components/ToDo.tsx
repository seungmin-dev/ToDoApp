import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";
import { Btn } from "./ToDoList";

const Task = styled.li`
  list-style: none;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ecf0f1;
  margin: 5px 0;
`;
function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = [...oldToDos];
      if (name !== "delete") {
        const newToDos = { ...oldToDo, category: name as IToDo["category"] };
        newToDo.splice(targetIndex, 1, newToDos);
      } else {
        if (window.confirm("이 할 일을 삭제할까요?")) {
          newToDo.splice(targetIndex, 1);
        }
      }
      return newToDo;
    });
  };

  return (
    <Task>
      {text}&nbsp;
      {category !== Categories.TODO && ( //인자가 있는 OnClick 이벤트를 처리하는 방법 <익명함수>, 보통은 onClick={onClick} 이렇게 하지만 이렇게 하면 인자가 넘겨지지 않을 것임
        <Btn
          name={Categories.TODO}
          onClick={onClick}
          style={{ backgroundColor: "#e74c3c", color: "white" }}
        >
          To Do
        </Btn>
      )}
      {category !== Categories.DOING && (
        <Btn
          name={Categories.DOING}
          onClick={onClick}
          style={{ backgroundColor: "#f39c12", color: "white" }}
        >
          Doing
        </Btn>
      )}
      {category !== Categories.DONE && (
        <Btn
          name={Categories.DONE}
          onClick={onClick}
          style={{ backgroundColor: "#27ae60", color: "white" }}
        >
          Done
        </Btn>
      )}
      <Btn
        name="delete"
        onClick={onClick}
        style={{ backgroundColor: "#9b59b6", color: "white" }}
      >
        삭제
      </Btn>
      <Line />
    </Task>
  );
}

export default ToDo;
