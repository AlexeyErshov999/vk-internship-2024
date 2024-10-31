import { makeAutoObservable } from "mobx";

interface Todo {
  id?: number;
  title: string;
  completed: boolean;
}

export class TodoStore {
  todos: Todo[] = [];
  loading: boolean = false;
  page: number = 0; // Текущая страница
  limit: number = 10; // Количество задач на странице

  constructor() {
    makeAutoObservable(this);
  }

  async fetchTodos() {
    this.loading = true;
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${this.page + 1}&_limit=${this.limit}`);
      const json = await response.json();
      this.todos.push(...json); // Добавляем новые задачи в существующий массив
      this.page++; // Увеличиваем номер страницы
    } catch (error) {
      console.error("Failed to fetch todos", error);
    } finally {
      this.loading = false;
    }
  }

  addTodo(todo: string) {
    this.todos.push({ title: todo, completed: false });
  }

  toggleTodo(index: number) {
    this.todos[index].completed = !this.todos[index].completed;
  }

  get completedTodos() {
    return this.todos.filter(todo => todo.completed);
  }

  get incompleteTodos() {
    return this.todos.filter(todo => !todo.completed);
  }
}

const todoStore = new TodoStore();
export default todoStore;