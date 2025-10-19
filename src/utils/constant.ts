export const SORT_OPTIONS = [
  { value: 'dueDate', label: 'Sort by Date' },
  { value: 'title', label: 'Sort by Name' },
];

export const PRIORITY_OPTIONS = [
  { value: '', label: 'Priority', disabled: true },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];
export const STATUS_OPTIONS = [
  { value: '', label: 'Status', disabled: true },
  { value: 'todo', label: 'Todo' },
  { value: 'pending', label: 'Pending' },
  { value: 'done', label: 'Done' },
];

export const STATUS_COLOR: Record<string, string> = {
  todo: 'bg-blue-100 text-blue-700',
  pending: 'bg-yellow-100 text-yellow-700',
  done: 'bg-green-100 text-green-700',
};
export const PRIORITY_COLOR: Record<string, string> = {
  low: 'bg-green-50 text-green-800',
  medium: 'bg-yellow-50 text-yellow-800',
  high: 'bg-red-50 text-red-800',
};
