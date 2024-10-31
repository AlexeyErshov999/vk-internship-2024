import FormTodoList from "./components/FormTodoList";
import Message from "./components/Message";
import { Heading } from "./components/Heading/Heading";
import Table from "./components/Table";
import { useTodoStore } from "./todoStore/storeContext";
import React from "react";

import todoStore from "./todoStore/todoStore";
import { createContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import useTodoList from "./hooks/useTodoList";

const TodoContext = createContext(todoStore);

const Todo: React.FC = observer(() => {
  const [cores, acts] = useTodoList();

  const store = useTodoStore();

  useEffect(() => {
    store.fetchTodos();
  }, [store]);

  return (
    <>
      <TodoContext.Provider value={todoStore}>
        <div className="row">
          <div className="col-12">
            <Heading>Список дел by Alexey Ershov</Heading>

            <Message>{cores.message}</Message>
            {store.loading && <p>Загрузка задач...</p>}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <FormTodoList acts={acts} cores={cores} />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Table todos={store.todos} acts={acts} />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <button onClick={() => store.fetchTodos()} disabled={store.loading}>
              {store.loading ? "Загрузка..." : "Загрузить больше"}
            </button>
          </div>
        </div>
      </TodoContext.Provider>
    </>
  );
});

export default Todo;
