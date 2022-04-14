import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import { Input } from "./CreateCategory";
import { Btn } from "./ToDoList";

const Form = styled.form`
  margin-bottom: 20px;
`;
interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("toDo", {
          required: "Please Write a to do",
        })}
        placeholder="Write a to do"
      />
      <Btn style={{ width: "100%" }}>추가</Btn>
    </Form>
  );
}

export default CreateToDo;
