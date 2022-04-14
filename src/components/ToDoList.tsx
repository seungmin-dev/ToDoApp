import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  Categories,
  categoryState,
  othersCategoryState,
  toDoSelector,
  toDoState,
} from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  padding: 30px 0;
  max-width: 480px;
  margin: 0 auto;
`;

const ToDoBoard = styled.div`
  border-radius: 15px;
  box-shadow: 3px 3px 5px #bbb;
  padding: 10px;
  background-color: ${(props) => props.theme.boardColor};
`;

const Header = styled.div`
  margin: 20px 0;
`;

const Title = styled.h2`
  font-size: 30px;
  text-align: center;
`;

const BtnWrapper = styled.div`
  margin-bottom: 10px;
  flex-direction: column;
`;

export const Btn = styled.button`
  border: none;
  background-color: white;
  border-radius: 5px;
  padding: 5px 10px;
`;

function ToDoList() {
  const allToDos = useRecoilValue(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCatogory] = useRecoilState(categoryState);
  const othersCategories = useRecoilValue(othersCategoryState);
  const [othersBtn, setOthersBtn] = useState(false);
  const onChangeCategories = (event: React.FormEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCatogory(value as any);
  };
  const onClickOthers = () => {
    setOthersBtn((prev) => !prev);
  };
  useEffect(() => {
    localStorage.setItem("toDo", JSON.stringify(allToDos));
  }, [allToDos]);

  return (
    <Container>
      <ToDoBoard>
        <Header>
          <Title>🔖 To Do List</Title>
        </Header>
        <BtnWrapper>
          <Btn
            value={Categories.TODO}
            onClick={onChangeCategories}
            style={{ backgroundColor: "#e74c3c", color: "white" }}
          >
            To Do
          </Btn>
          <Btn
            value={Categories.DOING}
            onClick={onChangeCategories}
            style={{ backgroundColor: "#f39c12", color: "white" }}
          >
            Doing
          </Btn>
          <Btn
            value={Categories.DONE}
            onClick={onChangeCategories}
            style={{ backgroundColor: "#27ae60", color: "white" }}
          >
            Done
          </Btn>
          {othersCategories?.map((otherCategory) => (
            <Btn
              key={otherCategory.id}
              value={otherCategory.category}
              onClick={onChangeCategories}
              style={{ backgroundColor: "#3498db", color: "white" }}
            >
              {otherCategory.category}
            </Btn>
          ))}
          <Btn
            value={Categories.OTHERS}
            onClick={onClickOthers}
            style={{ color: "black" }}
          >
            Add New Category
          </Btn>
          {othersBtn ? <CreateCategory /> : ""}
        </BtnWrapper>
        <CreateToDo />
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ToDoBoard>
    </Container>
  );
}

export default ToDoList;
