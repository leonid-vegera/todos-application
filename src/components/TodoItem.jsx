import { useState } from 'react';
import classNames from 'classnames';

export const TodoItem = ({ todo, onRemove, onComplete, editTodo }) => {
  const [editable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const { title, completed, id } = todo;

  const onEdit = () => {
    setEditable(true)
  }

  const saveEditedTodo = (key) => {
    if (!newTitle) {
      return;
    }
    switch (key) {
      case 'Escape':
        setNewTitle(title);
        setEditable(false);
        break;
      case 'Blur':
      case 'Enter':
        editTodo(id, newTitle)
        setEditable(false);
    }
  }

  return (
    <li
      className={classNames({
        completed: completed,
        active: !completed,
        editing: editable,
      })}

    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => {
            onComplete(id)
          }}
        />
        <label
          onDoubleClick={onEdit}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => {
            onRemove(id)
          }}
        />
      </div>
      {editable && (
        <input
          type="text"
          className="edit"
          autoFocus={true}
          value={newTitle}
          onChange={(event) => {
            setNewTitle(event.target.value)
          }}
          onKeyDown={(event) => {
            saveEditedTodo(event.key);
          }}
          onBlur={() => {
            saveEditedTodo('Blur')
          }}
        />
      )}

    </li>
  )
}
