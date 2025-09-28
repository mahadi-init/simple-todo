import { MadeWithDyad } from "@/components/made-with-dyad";
import AddTodoForm from "@/components/AddTodoForm";
import TodoList from "@/components/TodoList";
import { useTodos } from "@/hooks/use-todos";
import { TodoStatus } from "@/types/todo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const { addTodo, updateTodo, deleteTodo, getFilteredTodos } = useTodos();

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-3xl space-y-8">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 dark:text-gray-50 mb-8">
          My Todo List
        </h1>

        <AddTodoForm onAddTodo={addTodo} />

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="done">Done</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <TodoList
              todos={getFilteredTodos()}
              onUpdateTodo={updateTodo}
              onDeleteTodo={deleteTodo}
            />
          </TabsContent>
          <TabsContent value="ongoing" className="mt-4">
            <TodoList
              todos={getFilteredTodos(TodoStatus.ONGOING)}
              onUpdateTodo={updateTodo}
              onDeleteTodo={deleteTodo}
            />
          </TabsContent>
          <TabsContent value="done" className="mt-4">
            <TodoList
              todos={getFilteredTodos(TodoStatus.DONE)}
              onUpdateTodo={updateTodo}
              onDeleteTodo={deleteTodo}
            />
          </TabsContent>
          <TabsContent value="other" className="mt-4">
            <TodoList
              todos={getFilteredTodos(TodoStatus.OTHER)}
              onUpdateTodo={updateTodo}
              onDeleteTodo={deleteTodo}
            />
          </TabsContent>
        </Tabs>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;