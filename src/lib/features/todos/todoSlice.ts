"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ITodo {
    id: number | string
    text: string
    completed: boolean
    editing: boolean
}

export interface ITodoState {
    items: ITodo[]
}

const initialState: ITodoState = {
    items: [],
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.items.push({ id: Date.now(), text: action.payload, completed: false, editing: false})
        },
        setEditing: (state, action: PayloadAction<{id: string | number, editing: boolean}>) => {
            state.items.map((todo) => {
                todo.id === action.payload.id ? todo.editing = action.payload.editing : todo
            })
        },
        editTodo: (state, action: PayloadAction<{ id: number | string, text: string }>) => {
            state.items.map((todo) => {
                todo.id === action.payload.id ? todo.text = action.payload.text : todo
        })
        },
        removeTodo: (state, action: PayloadAction<string | number>) => {
            state.items = state.items.filter(todo => todo.id !== action.payload)
        }
    }
})

export const { addTodo, editTodo, setEditing, removeTodo } = todoSlice.actions
export default todoSlice.reducer