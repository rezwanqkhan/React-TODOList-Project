import { useState, useEffect } from 'react'
import '../public/style.css'
import NewTodoForm from './NewTodoForm'
import TodoList from './TodoList'

export default function App() {

  const [todos, setTodos] = useState(
    () => {
      const savedTodos = JSON.parse(localStorage.getItem('todos'))
      return savedTodos || []
    }
  )

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos(currentTodos =>
      {
        return [
          ...currentTodos,
          {
            id: crypto.randomUUID(),
             title,
            completed: false
          }
        ] 
      }
     )
  }


  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        return todo.id === id ? {...todo, completed} : todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
     <NewTodoForm  onSubmit={addTodo}/>
   
 

  <h1 className='header'>Todo List</h1>
 
 <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>


    
    </>

  )
    
   
}

 