import React, { Suspense } from "react";
import { TodoFunctions, TodoProps } from "../hooks/useTodoList";

const LazyTodoItem = React.lazy(() => import("./TodoItem"));

interface Props {
  tasks: TodoProps[];
  acts: TodoFunctions;
}

const TodoList = ({ tasks, acts }: Props) => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      {tasks.map((todo: TodoProps, index: number) => (
        <LazyTodoItem
          key={`${todo.id}-${index}`}
          todo={todo}
          index={index}
          acts={acts}
        />
      ))}
    </Suspense>
  );
};

export default TodoList;
