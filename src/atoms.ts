import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TODO" | "DOING" | "DONE"; //string도 제한해서 받을 수 있음
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
