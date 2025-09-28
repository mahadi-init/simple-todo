import React, { useState } from "react";
import { Todo, TodoStatus } from "@/types/todo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description || "");

  const handleStatusChange = (checked: boolean) => {
    onUpdateTodo(todo.id, { status: checked ? TodoStatus.DONE : TodoStatus.ONGOING });
  };

  const handleEditSave = () => {
    if (editedTitle.trim()) {
      onUpdateTodo(todo.id, {
        title: editedTitle.trim(),
        description: editedDescription.trim() || undefined,
      });
      setIsEditing(false);
    }
  };

  const getStatusBadge = (status: TodoStatus) => {
    switch (status) {
      case TodoStatus.DONE:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Done</span>;
      case TodoStatus.ONGOING:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Ongoing</span>;
      case TodoStatus.OTHER:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">Other</span>;
      default:
        return null;
    }
  };

  return (
    <Card className="flex items-start p-4 space-x-4">
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.status === TodoStatus.DONE}
        onCheckedChange={handleStatusChange}
        className="mt-1"
      />
      <div className="flex-1 grid gap-1">
        <CardTitle className={`text-lg font-medium ${todo.status === TodoStatus.DONE ? "line-through text-muted-foreground" : ""}`}>
          {todo.title}
        </CardTitle>
        {todo.description && (
          <CardDescription className={`${todo.status === TodoStatus.DONE ? "line-through text-muted-foreground" : ""}`}>
            {todo.description}
          </CardDescription>
        )}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {getStatusBadge(todo.status)}
          <span className="text-xs">
            Created: {new Date(todo.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsEditing(true)}>
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onUpdateTodo(todo.id, { status: TodoStatus.ONGOING })}>
            Set to Ongoing
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onUpdateTodo(todo.id, { status: TodoStatus.DONE })}>
            Set to Done
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onUpdateTodo(todo.id, { status: TodoStatus.OTHER })}>
            Set to Other
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDeleteTodo(todo.id)} className="text-red-600 focus:text-red-600">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
            <DialogDescription>
              Make changes to your todo here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                Title
              </Label>
              <Input
                id="edit-title"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="edit-description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleEditSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TodoItem;