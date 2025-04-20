import { useState } from 'react'

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'
  const [sortBy, setSortBy] = useState('date') // 'date', 'title'

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title)
    }
    return 0 // Keep original order for date
  })

  return (
    <div className="todo-container">
      <div className="todo-controls">
        <div className="filter-buttons">
          <button 
            className={`btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        <div className="sort-controls">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      <ul className='list'>
        {sortedTodos.length === 0 ? (
          <p className="no-todos">No todos to display</p>
        ) : (
          sortedTodos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <label>
                <input 
                  type="checkbox" 
                  checked={todo.completed}
                  onChange={e => toggleTodo(todo.id, e.target.checked)}
                />
                <span className="todo-title">{todo.title}</span>
              </label>
              <button 
                onClick={() => deleteTodo(todo.id)} 
                className="btn btn-danger"
                title="Delete todo"
              >
                ×
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
