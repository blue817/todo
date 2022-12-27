import React, { useState } from 'react';
import { useEffect } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css';

export default function TodoList({filter}) {
    const [todos,setTodos] =useState(() => readTodoFromLocalStorage() );
    const handleAdd=(todo)=>{
        //새로운 투두를 todos에 업데이트 해야함(덮어씌우기)
        setTodos([...todos, todo]);
    }
     const handleUpdate=(updated)=>{
        //업데이트 된 아이템만 업데이트
        setTodos(todos.map(t=> t.id === updated.id? updated : t));
    }
    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos]);
     const handleDelete=(deleted)=>{
        //지워진 아이템이 아니면 배열로 만들음(새로운 배열)
        setTodos(todos.filter(t=> t.id !==deleted.id));
    }
    const filtered = getFilteredItems(todos, filter);
    return (
        <section className={styles.container}>
            <ul className={styles.list}>
                {filtered.map((item)=>(
                <Todo key={item.id} todo={item} onUpdate={handleUpdate} onDelete={handleDelete}/>
                ))}
            </ul>
            <AddTodo onAdd={handleAdd}/>     
        </section>
    );
}

function readTodoFromLocalStorage(){
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}
function getFilteredItems(todos, filter){
    if(filter === 'all'){
        return todos;
    }
    return todos.filter(todo=> todo.status === filter);
}