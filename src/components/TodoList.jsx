import { TodoItem } from "./TodoItem"

export const TodoList = ({ todos, onRemove, onComplete, editTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          onRemove={onRemove}
          onComplete={onComplete}
          editTodo={editTodo}
          key={todo.id}
        />
      ))}
    </ul>
  )
}
