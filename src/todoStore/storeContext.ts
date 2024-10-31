// TodoContext.tsx
import { createContext, useContext } from "react";
import todoStore from "./todoStore";

const TodoContext = createContext(todoStore);

export const useTodoStore = () => {
  return useContext(TodoContext);
};