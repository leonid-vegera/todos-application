import React, { useContext } from "react";
import { TodosContext } from '../utils/TodosContext';
import { TodoItem } from "./TodoItem"

export const TodoList = React.memo(
  () => {
    const { todos } = useContext(TodosContext);

    console.log('Rendering TodoList');

    return (
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
          />
        ))}
      </ul>
    )
  }
)
