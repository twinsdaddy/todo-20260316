import { useState } from 'react'
import './index.css'

const translations = {
  en: {
    title: 'My Tasks',
    placeholder: 'What needs to be done?',
    addBtn: 'Add',
    emptyState: 'No tasks yet. Add one above!'
  },
  ko: {
    title: '나의 오늘 할 일',
    placeholder: '무엇을 해야 하나요?',
    addBtn: '추가',
    emptyState: '아직 할 일이 없습니다. 항목을 추가해보세요!'
  }
}

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [lang, setLang] = useState('ko') // 기본 언어: 한국어

  const t = translations[lang]

  const handleAddTodo = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    
    setTodos([...todos, {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false
    }])
    setInputValue('')
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const toggleLang = () => {
    setLang(prev => prev === 'ko' ? 'en' : 'ko')
  }

  return (
    <div className="app-container">
      <div className="todo-card">
        <div className="header-row">
          <h1 className="title">{t.title}</h1>
          <button className="lang-btn" onClick={toggleLang}>
            {lang === 'ko' ? 'A / 가' : '가 / A'}
          </button>
        </div>
        
        <form onSubmit={handleAddTodo} className="input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t.placeholder}
            className="todo-input"
          />
          <button type="submit" className="add-btn">{t.addBtn}</button>
        </form>

        <ul className="todo-list">
          {todos.length === 0 ? (
            <li className="empty-state">{t.emptyState}</li>
          ) : (
            todos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-content" onClick={() => toggleTodo(todo.id)}>
                  <div className={`checkbox ${todo.completed ? 'checked' : ''}`}>
                    {todo.completed && '✓'}
                  </div>
                  <span className="todo-text">{todo.text}</span>
                </div>
                <button 
                  onClick={() => handleDeleteTodo(todo.id)} 
                  className="delete-btn"
                  aria-label="Delete task"
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
