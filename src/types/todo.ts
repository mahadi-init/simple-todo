export enum TodoStatus {
  ONGOING = "ongoing",
  DONE = "done",
  OTHER = "other",
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  createdAt: number;
}