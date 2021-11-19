import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { useLocalStorage } from './utils/useLocalStorage';
import classNames from 'classnames';
import './App.css';

// let initialTodos = [
//   { title: 'Change winter tires', id: '1927', completed: false },
//   { title: 'Check pressure', id: '1312', completed: false },
//   { title: 'Repair water tap', id: '1610', completed: true },
//   { title: 'Buy beer for barbeckue', id: '1584', completed: false }
// ]

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const activeTodos = todos.filter(todo => (
    todo.completed === false
  ))
  const completedTodos = todos.filter(todo => (
    todo.completed === true
  ))

  const addTodo = (title) => {
    const newTodo = {
      title,
      completed: false,
      id: +new Date(),
    }
    return (
      setTodos([...todos, newTodo])
    )
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!query) { return }
    addTodo(query);
    setQuery('');
  }

  const editTodo = (todoId, newTitle) => {
    setTodos(
      [...todos].map(todo => {
        if (todo.id !== todoId) {
          return todo;
        }
        return {
          ...todo,
          title: newTitle,
        }
      })
    )
  }

  const removeTodo = (todoId) => {
    setTodos(
      [...todos].filter(todo => todo.id !== todoId)
    )
  }

  const clearCompleted = () => {
    setTodos(
      [...todos.filter(todo => (
        todo.completed !== true
      ))]
    )
  }

  const completeTodo = (todoId) => {
    setTodos(
      [...todos.map(todo => {
        if (todo.id !== todoId) {
          return todo;
        }
        return {
          ...todo,
          completed: !todo.completed,
        }
      })]
    )
  }

  const setAllCompleted = () => {
    setTodos(
      [...todos.map(todo => {
        if (completedTodos.length === todos.length) {
          return {
            ...todo,
            completed: false,
          }
        }
        return {
          ...todo,
          completed: true,
        }
      })]
    )
  }

  let visibleTodos = [...todos];
  switch (filter) {
    case 'active':
      visibleTodos = activeTodos;
      break;
    case 'completed':
      visibleTodos = completedTodos;
      break;
    default: visibleTodos = todos;
  }

  const showAll = () => {
    setFilter('all');
  }
  const showActive = () => {
    setFilter('active')
  }
  const showCompleted = () => {
    setFilter('completed')
  }

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={(submitHandler)}>
            <input
              type="text"
              className="new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <section className="main">
              <input type="checkbox" id="toggle-all" className="toggle-all" />
              <label
                htmlFor="toggle-all"
                onClick={setAllCompleted}
              >
                Mark all as complete
              </label>

              <TodoList
                todos={visibleTodos}
                onRemove={removeTodo}
                onComplete={completeTodo}
                editTodo={editTodo}
              />
            </section>

            <footer className="footer">
              <span className="todo-count">
                {activeTodos.length === 1
                  ? '1 item left'
                  : (`${activeTodos.length} items left`)
                }
              </span>

              <ul className="filters">
                <li>
                  <a
                    href="#/"
                    className={classNames({ selected: filter === 'all' })}
                    onClick={showAll}
                  >
                    All
                  </a>
                </li>

                <li>
                  <a
                    href="#/active"
                    className={classNames({ selected: filter === 'active' })}
                    onClick={showActive}
                  >
                    Active
                  </a>
                </li>

                <li>
                  <a
                    href="#/completed"
                    className={classNames({ selected: filter === 'completed' })}
                    onClick={showCompleted}
                  >
                    Completed
                  </a>
                </li>
              </ul>

              {activeTodos.length < todos.length && (
                <button
                  type="button"
                  className="clear-completed"
                  onClick={clearCompleted}
                >
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </section>

      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="http://twitter.com/oscargodson">Oscar Godson</a></p>
        <p>Refactored by <a href="https://github.com/cburgmer">Christoph Burgmer</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </>
  )
}

export default App;
