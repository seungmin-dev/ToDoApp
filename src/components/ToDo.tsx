import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  //   const onClick = (newCategory: "TODO" | "DOING" | "DONE") => {}; 이렇게 작성해도 되지만 아래처럼 작성하는게 효율적
  const onClick = (newCategory: IToDo["category"]) => {
    console.log();
  };
  return (
    <li>
      {text}
      {category !== "DOING" && ( //인자가 있는 OnClick 이벤트를 처리하는 방법 <익명함수>, 보통은 onClick={onClick} 이렇게 하지만 이렇게 하면 인자가 넘겨지지 않을 것임
        <button onClick={() => onClick("DONE")}>To Do</button>
      )}
      {category !== "TODO" && (
        <button onClick={() => onClick("TODO")}>Doing</button>
      )}
      {category !== "DONE" && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )}
    </li>
  );
}

// 위와 같은 코드
// function ToDo({ text, category, id }: IToDo) {
// const setToDos = useSetRecoilState(toDoState);
//   const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     const {
//       currentTarget: { name },
//     } = event;
//   };
//   return (
//     <li>
//       {text}
//       {category !== "DOING" && ( //인자가 있는 OnClick 이벤트를 처리하는 방법 <익명함수>, 보통은 onClick={onClick} 이렇게 하지만 이렇게 하면 인자가 넘겨지지 않을 것임
//         <button name="DOING" onClick={() => onClick("DONE")}>
//           To Do
//         </button>
//       )}
//       {category !== "TODO" && (
//         <button name="TODO" onClick={() => onClick("TODO")}>
//           Doing
//         </button>
//       )}
//       {category !== "DONE" && (
//         <button name="DONE" onClick={() => onClick("DONE")}>
//           Done
//         </button>
//       )}
//     </li>
//   );
// }

export default ToDo;
