import { useState } from 'react'
import './App.css'
import { NewTodoForm } from './NewTodoForm';

export default function App() {
  type Todo = {
    id: string;
    title: string;
    completed: boolean;
  }

  const [todos, setTodos] = useState<Todo[]>([]);

  function addTodo(newItemTitle: string) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title: newItemTitle,
          completed: false
        }
      ]
    });
  }

  function toggleTodo(id: string, completed: boolean) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed
          }
        }

        return todo;
      })
    });
  }

  function deleteTodo(id: string) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    });
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo}/>

      <h1 className='header'>Todo List</h1>
      <ul className='list'>
        {todos.length === 0 && <li>No items</li>}
        {todos.map(todo => (
          <li key={todo.id}>
            <label>
              <input type='checkbox' checked={todo.completed}
              onChange={e => toggleTodo(todo.id, e.target.checked)}/>

              <span>{todo.title}</span>
              <button onClick={() => deleteTodo(todo.id)} className='btn btn-danger'>Delete</button>
            </label>
          </li>
        ))}
      </ul>
    </>
  )
}