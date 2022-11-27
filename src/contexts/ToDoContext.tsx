import React, { createContext, useContext, useReducer } from 'react'
import { actions } from '../actions/actions'
import { Action, ToDoContextType, ChildrenProps, State } from '../types/types'

export const ToDoContext = createContext({} as ToDoContextType)

export const useToDoList = () => {
    const { state } = useContext(ToDoContext)
    return state.toDoList
}

export const useToDoDispatch = () => {
    const { toDoDispatch } = useContext(ToDoContext)
    return toDoDispatch
}

export const useEditToDo = () => {
    const { state } = useContext(ToDoContext)
    return state.editToDo
}

const toDoReducer = (state: State, action: Action) => {
    switch (action.type) {
        case actions.ADD: {
            const title = (action.payload as string).trim()
            if (title.length === 0) {
                return state
            }

            const duplicateToDo = state.toDoList.find(todo => todo.title === title)
            if (duplicateToDo) {
                return state
            }

            if (state.editToDo) {
                return {
                    ...state,
                    editToDo: 0,
                    toDoList: state.toDoList.map(todo => {
                        if (todo.id === state.editToDo) {
                            return { ...todo, title: action.payload as string, status: todo.status ? !todo.status : todo.status }
                        }
                        return todo
                    })
                }
            }

            return {
                ...state,
                toDoList: [
                    {
                        id: Date.now(),
                        title,
                        status: false
                    },
                    ...state.toDoList
                ]
            }
        }
        case actions.EDIT: {
            return {
                ...state,
                editToDo: action.payload as number
            }
        }
        case actions.DELETE: {
            return { ...state, toDoList: state.toDoList.filter(todo => todo.id !== action.payload as number) }
        }
        case actions.TOGGLE: {
            return {
                ...state, toDoList: state.toDoList.map(todo => todo.id === action.payload ? (
                    { ...todo, status: !todo.status }) : todo)
            }
        }
        default: return state
    }
}

export const ToDoComponent = ({ children }: ChildrenProps) => {
    const [state, toDoDispatch] = useReducer(toDoReducer, { toDoList: [], editToDo: 0 })

    return (
        <ToDoContext.Provider value={{ state, toDoDispatch }}>
            {children}
        </ToDoContext.Provider>
    )
}