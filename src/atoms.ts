import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TODO" | "DOING" | "DONE"; //string도 제한해서 받을 수 있음
}

export const categoryState = atom({
  key: "category",
  default: "TODO",
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
