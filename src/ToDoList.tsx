import React, { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList() {
//     const [toDo, setToDo] = useState("");
//     const onChange = (event:React.FormEvent<HTMLInputElement>) => {
//         const {
//             currentTarget: {value},
//         } = event;
//         setToDo(value);
//     };
//     const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         console.log(toDo);
//     }
//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//                 <button>Add</button>
//             </form>
//         </div>
//     )
// }

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed.",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", { required: "firstname is required" })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", { required: true })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("userName", {
            required: "userName is required",
            minLength: {
              value: 7,
              message: "Your username is too short.",
            },
          })}
          placeholder="userName"
        />
        <span>{errors?.userName?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
