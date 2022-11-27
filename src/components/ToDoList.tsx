import React, { useState, FormEvent, useEffect } from 'react'
import { actions } from '../actions/actions'
import { useToDoDispatch, useToDoList, useEditToDo } from '../contexts/ToDoContext'
import ToDo from './ToDo'

export default function ToDoList() {
    const [title, setTitle] = useState('')
    const toDoDispatch = useToDoDispatch()
    const toDoList = useToDoList()
    const editToDo = useEditToDo()

    useEffect(() => {
        if (editToDo) {
            toDoList.map(todo => todo.id === editToDo ? setTitle(todo.title) : null)
        }
    }, [editToDo])

    useEffect(() => {
        setTitle('')
    }, [toDoList])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        toDoDispatch({ type: actions.ADD, payload: title })
    }

    return (
        <div className="App">
            <form style={{ display: 'inline' }} onSubmit={(e) => handleSubmit(e)}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </form>
            {!editToDo && <button onClick={() => toDoDispatch({ type: actions.ADD, payload: title })}>+ Add</button>}
            {editToDo ? <button onClick={() => toDoDispatch({ type: actions.ADD, payload: title })}>Update</button> : null}
            <ToDo />
        </div>
    )
}