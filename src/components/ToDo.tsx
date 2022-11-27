import { useToDoDispatch, useToDoList } from '../contexts/ToDoContext'
import { actions } from '../actions/actions'
import React from 'react'

export default function ToDo() {
    const toDoList = useToDoList()
    const toDoDispatch = useToDoDispatch()

    const handleEdit = (id: number) => {
        toDoDispatch({ type: actions.EDIT, payload: id })
    }

    return (
        <div className="to_do_list">
            {toDoList.map(todo => (
                <div
                    key={todo.id}
                    className="to-do"
                    style={{ cursor: 'pointer', marginTop: '1rem' }}
                    onDoubleClick={() => toDoDispatch({ type: actions.TOGGLE, payload: todo.id })}
                >
                    <div style={{ color: 'blue' }} >{todo.id}</div>
                    <div><strong>{todo.title}</strong></div>
                    {todo.status ? <div style={{ color: 'green' }}>Completed</div> : <div style={{ color: 'red' }}>Incomplete</div>}
                    <button onClick={() => handleEdit(todo.id)}>
                        Edit
                    </button>
                    <button onClick={() => toDoDispatch({ type: actions.DELETE, payload: todo.id })}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    )
}