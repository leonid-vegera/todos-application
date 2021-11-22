import React, { useState, useContext } from 'react';
import { TodosContext } from '../utils/TodosContext';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = React.memo(
  ({ todo }) => {
    const { onRemove, onComplete, editTodo } = useContext(TodosContext);
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

    console.log('Rendering TodoItem');

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
)

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  })
}