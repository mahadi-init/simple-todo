import { useState, useEffect } from "react";
import { Todo, TodoStatus } from "@/types/todo";

const LOCAL_STORAGE_KEY = "dyad-todos";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== "undefined") {
      const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedTodos ? JSON.parse(savedTodos) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (title: string, description?: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      description,
      status: TodoStatus.ONGOING,
      createdAt: Date.now(),
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTodo = (id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const getFilteredTodos = (status?: TodoStatus) => {
    if (!status) {
      return todos;
    }
    return todos.filter((todo) => todo.status === status);
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    getFilteredTodos,
  };
};