import React, { useState, useCallback, useMemo } from 'react';
import { TodoList } from './components/TodoList';
import { useLocalStorage } from './utils/useLocalStorage';
import { TodosContext } from './utils/TodosContext';
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

  const activeTodos = useMemo(() => {
    return todos.filter(todo => (
    todo.completed === false
  ))
  }, [todos])
  const completedTodos = useMemo(() => {
    return todos.filter(todo => (
      todo.completed === true
    ))
  }, [todos])

  const addTodo = useCallback((title) => {
    const newTodo = {
      title,
      completed: false,
      id: +new Date(),
    }
    return (
      setTodos([...todos, newTodo])
    )
  }, [todos, setTodos])

  const submitHandler = useCallback((event) => {
    event.preventDefault();
    if (!query) { return }
    addTodo(query);
    setQuery('');
  }, [addTodo, query])

  const editTodo = useCallback((todoId, newTitle) => {
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
  }, [todos, setTodos])


  const removeTodo = useCallback((todoId) => {
    setTodos(
      [...todos].filter(todo => todo.id !== todoId)
    )
  }, [todos, setTodos])

  const clearCompleted = useCallback(() => {
    setTodos(
      [...todos.filter(todo => (
        todo.completed !== true
      ))]
    )
  }, [todos, setTodos])

  const completeTodo = useCallback((todoId) => {
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
  }, [todos, setTodos]);

  const setAllCompleted = useCallback(() => {
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
  }, [todos, setTodos]);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return activeTodos;
      case 'completed':
        return completedTodos;
      default: return todos;
    }
  }, [todos, filter, activeTodos, completedTodos])

  const showAll = useCallback(() => {
    setFilter('all');
  }, [])
  const showActive = useCallback(() => {
    setFilter('active')
  }, [])
  const showCompleted = useCallback(() => {
    setFilter('completed')
  }, [])

  const contextValue = useMemo(() => {
    return ({
      todos: visibleTodos,
      removeTodo,
      completeTodo,
      editTodo,
    })
  }, [visibleTodos, removeTodo, completeTodo, editTodo]);

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
              onBlur={(submitHandler)}
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

              <TodosContext.Provider value={contextValue} >
                <TodoList />
              </TodosContext.Provider>

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
