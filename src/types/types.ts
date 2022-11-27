import React from "react"

export interface ToDo {
    id: number
    title: string
    status: boolean
}

export type ToDoList = ToDo[]

export interface Action {
    type: string
    payload: string | number
}

export interface State {
    toDoList: ToDoList
    editToDo: number
}

export interface ToDoContextType {
    state: State
    toDoDispatch: React.Dispatch<Action>
}


export type ChildrenProps = { children: React.ReactNode }