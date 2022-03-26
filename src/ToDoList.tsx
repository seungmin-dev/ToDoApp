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
  password1: string;
  password2: string;
  extraError?: string; //항목이 필수값이 아니면 '?'
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password1 !== data.password2) {
      setError(
        "password2",
        { message: "Passwords are not the same" },
        { shouldFocus: true } //error가 발생한다면 해당 항목으로 자동 focus
      );
    }
    setError("extraError", { message: "Server offline." });
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
          {...register("firstName", {
            required: "firstname is required",
            validate: {
              noDogs: (value) =>
                value.includes("dog") ? "No Dogs allowed." : true,
              noCats: (value) =>
                value.includes("cat") ? "No Cats allowed." : true,
            },
            // or
            // validate: (value) => !value.includes("dog")
            // dog이 들어있으면 안됨
          })}
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
        <input
          {...register("password1", {
            required: "password is required",
            minLength: {
              value: 8,
              message: "Your password is too short",
            },
          })}
          placeholder="password"
        />
        <span>{errors?.password1?.message}</span>
        <input
          {...register("password2", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Your password is too short",
            },
          })}
          placeholder="password"
        />
        <span>{errors?.password2?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
