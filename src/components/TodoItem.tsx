import { TodoProps } from "../hooks/useTodoList";
import Button from "./Button";
import React from "react";

interface TodoItemProps {
  todo: TodoProps;
  index: number;
  acts: {
    done: (todo: TodoProps) => void;
    edit: (todo: TodoProps) => void;
    remove: (id: number) => void;
  };
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, index, acts }) => {
  return (
    <tr key={todo.id}>
      <td className="align-middle">{index + 1}</td>
      <td className="align-middle">
        <div
          className="btn-group-vertical"
          role="group"
          aria-label="Vertical radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check"
            id={"not-yet-" + todo.id}
            autoComplete="off"
            checked={!todo.completed}
            onChange={() => acts.done(todo)}
          />
          <label
            className="btn btn-outline-info"
            htmlFor={"not-yet-" + todo.id}
          >
            В процессе!
          </label>
          <input
            type="radio"
            className="btn-check"
            id={"done-" + todo.id}
            autoComplete="off"
            checked={todo.completed}
            onChange={() => acts.done(todo)}
          />
          <label className="btn btn-outline-info" htmlFor={"done-" + todo.id}>
            Готово!
          </label>
        </div>
      </td>
      <td className="align-middle text-center text-md-start">
        <label className="form-check-label">{todo.title}</label>
      </td>
      <td className="align-middle">
        {todo.completed ? (
          <span className="badge text-bg-success">Finished</span>
        ) : (
          <span className="badge text-bg-danger">Progress</span>
        )}
      </td>
      <td className="align-middle">
        <Button className="me-2 mb-2" onClick={() => acts.edit(todo)}>
          Изменить
        </Button>
        <Button
          color="danger"
          className="me-2 mb-2"
          onClick={() => acts.remove(todo.id!)}
        >
          Удалить
        </Button>
      </td>
    </tr>
  );
};

export default TodoItem;
