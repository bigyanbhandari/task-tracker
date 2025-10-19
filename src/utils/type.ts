export type Debounce = {
  value: string;
  delay: number;
};

export type TaskForm = {
  id?: string | undefined;
  title: string;
  dueDate: string;
  status: string;
  priority: string;
};
