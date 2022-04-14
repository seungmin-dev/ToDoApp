import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { othersCategoryState } from "../atoms";
import { Btn } from "./ToDoList";

export const Input = styled.input`
  padding: 5px;
  border: none;
  border-radius: 5px;
  width: 100%;
`;

interface ICatForm {
  category: string;
}
function CreateCategory() {
  const othersCategory = useRecoilValue(othersCategoryState);
  const setOthersCategory = useSetRecoilState(othersCategoryState);
  const { register, handleSubmit, setValue } = useForm<ICatForm>();
  const onSubmit = ({ category }: ICatForm) => {
    setOthersCategory((prevCategories) => [
      { category: category, id: Date.now() },
      ...prevCategories,
    ]);
    setValue("category", "");
  };
  useEffect(() => {
    localStorage.setItem("category", JSON.stringify(othersCategory));
  }, [othersCategory]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("category", { required: "카테고리를 입력해주세요." })}
          placeholder="새로운 카테고리"
        />
        <Btn style={{ width: "100%" }}>생성</Btn>
      </form>
    </>
  );
}

export default CreateCategory;
