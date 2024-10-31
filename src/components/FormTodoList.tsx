import Input from "../components/Input";
import Button from "../components/Button";
import { TodoCores, TodoFunctions } from "../hooks/useTodoList";

interface Props {
  cores: TodoCores;
  acts: TodoFunctions;
}

const FormTodoList = ({ cores, acts }: Props) => (
  <form className="mb-3" onSubmit={acts.save}>
    <div className="input-group mb-3">
      <Input
        ref={cores.inputRef}
        placeholder="Название дела ..."
        value={cores.activity}
        onChange={(event) => acts.setActivity(event.target.value)}
      />

      <Button outline>{cores.editedTodo ? "Сохранить" : "Добавить"}</Button>

      {cores.editedTodo && (
        <Button outline color="danger" className="me-2" onClick={acts.exit}>
          Отменить
        </Button>
      )}
    </div>
  </form>
);

export default FormTodoList;