"use client";

import { addTodo, editTodo, ITodo, removeTodo, setEditing } from "@/lib/features/todos/todoSlice";
import { AppDispatch } from "@/lib/store";
import { RootState } from "@reduxjs/toolkit/query";
import { FormEvent, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("")
  const todos = useSelector((state: RootState) => state.todos.items);
  const dispatch: AppDispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  function handleSubmit(e: FormEvent, id: number | string, text: string, editing : boolean) {
    e.preventDefault();
    dispatch(editTodo({id, text}))
    dispatch(setEditing({id, editing}))
  }

  function handleSetEditing(id: string | number, editing : boolean) {
    dispatch(setEditing({id, editing}))
  }

  return (
    <main className="flex h-screen w-full justify-center home-pattern">
      <div className="shadow-lg md:w-[80vw] w-96  m-5 p-5 bg-transparent flex flex-col items-center">
        <div className="h-[40px] flex gap-5">
          <input
            id="input"
            type="text"
            value={text}
            placeholder="Add your todo for today..."
            className="border h-full border-black px-2"
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="w-50 h-full p-4 bg-black text-white text-center flex items-center"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>

        <ul className="w-full m-10 flex flex-col gap-5">
          {todos.map((todo: ITodo) => (
            <li className="w-full" key={todo.id}>
              <div className="flex w-full items-center gap-5">
                {todo.editing ? (
                  <form className="w-[70%]" onSubmit={(event) => handleSubmit(event, todo.id, editText, false)}>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="bg-[#b4f2f7] px-3 border-[2px] w-full mr-5 h-[30px] border-black/[0.8]"
                    />
                  </form>
                ) : (
                  <p className="bg-[#dfebec] rounded-lg px-3 w-[70%] mr-5 h-[30px]">
                    {todo.text}
                  </p>
                )}

                {!todo.editing && <button
                  className="text-2xl bg-[pink] p-2"
                  onClick={() => {
                    handleSetEditing(todo.id, true)
                    console.log(todo.editing)
                  }}
                >
                  Edit
                </button>}
                <button onClick={() => dispatch(removeTodo(todo.id))}>
                  <FaTrash fill="red" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
