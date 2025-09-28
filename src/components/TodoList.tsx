import React from "react";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdateTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return (
      <p className="text-center text-muted-foreground mt-8">
        No todos in this category.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;