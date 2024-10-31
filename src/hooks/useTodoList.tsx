import React, { useEffect, useRef, useState } from "react";
import { setItemWithExp as setLocal } from "../helpers/localStorage";
import { generateId } from "../helpers/generateId";
import { useTodoStore } from "../todoStore/storeContext";
import { action } from "mobx";

export interface TodoProps {
  id?: number;
  title: string;
  completed: boolean;
}

export interface TodoCores {
  todos: TodoProps[];
  activity: string;
  editedTodo: TodoProps | null;
  message: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

export interface TodoFunctions {
  setActivity: React.Dispatch<React.SetStateAction<string>>;
  save: (event: React.FormEvent) => void;
  remove: (todoId: number) => void;
  edit: (todo: TodoProps) => void;
  done: (todo: TodoProps) => void;
  exit: () => void;
}

function useTodoList(): [TodoCores, TodoFunctions] {
  const store = useTodoStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const [activity, setActivity] = useState<string>("");
  const [editedTodo, setEditedTodo] = useState<TodoProps | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const saveTodoHandler = action((event: React.FormEvent) => {
    event.preventDefault();

    if (!activity) {
      setMessage("Activity name should not be empty!");
      return;
    }

    setMessage("");

    if (editedTodo) {
      // Обновляем существующий todo
      const todoIndex = store.todos.findIndex(
        (todo) => todo.id === editedTodo.id
      );
      if (todoIndex !== -1) {
        store.todos[todoIndex] = { ...store.todos[todoIndex], title: activity }; // Изменяем только заголовок
        setLocal("todos", [...store.todos]); // Сохраняем в локальное хранилище
      }
      return exitTodoHandler();
    }

    // Создаем новый todo
    const newTodo: TodoProps = {
      id: generateId(),
      title: activity,
      completed: false,
    };
    store.todos.push(newTodo); // Добавляем новый todo в store // Сохраняем в локальное хранилище
    setActivity("");
  });

  const removeTodoHandler = action((todoId: number) => {
    store.todos = store.todos.filter((todo) => todo.id !== todoId);
    if (editedTodo) exitTodoHandler();
    console.log("delete work");
  });

  const editTodoHandler = action((todo: TodoProps) => {
    inputRef.current?.focus();
    setEditedTodo(todo);
    setActivity(todo.title);
  });

  const exitTodoHandler = action(() => {
    setEditedTodo(null);
    setActivity("");
  });

  const doneTodoHandler = action((todo: TodoProps) => {
    const todoIndex = store.todos.findIndex(
      (currentTodo) => currentTodo.id === todo.id
    );
    if (todoIndex !== -1) {
      store.todos[todoIndex].completed = !store.todos[todoIndex].completed; // Переключаем статус completed
    }
  });

  const acts: TodoFunctions = {
    setActivity,
    save: saveTodoHandler,
    remove: removeTodoHandler,
    edit: editTodoHandler,
    exit: exitTodoHandler,
    done: doneTodoHandler,
  };

  const cores: TodoCores = {
    todos: store.todos,
    activity,
    editedTodo,
    message,
    inputRef,
  };

  return [cores, acts];
}

export default useTodoList;
