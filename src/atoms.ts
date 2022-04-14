import { atom, selector } from "recoil";

export enum Categories {
  // "TODO", => 값이 0
  "TODO" = "TODO", // => 값이 TODO
  "DOING" = "DOING",
  "DONE" = "DONE",
}

// type categories = "TODO" | "DOING" | "DONE";

export interface IToDo {
  text: string;
  id: number;
  category: Categories; //string도 제한해서 받을 수 있음
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TODO,
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
