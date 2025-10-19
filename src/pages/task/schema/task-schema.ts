import z from 'zod';

export const taskSchema = z.object({
  title: z
    .string({ error: 'Task title is required' })
    .min(1, 'Task title is required'),
  dueDate: z
    .string({ error: 'Due date is required' })
    .min(1, 'Due date is required'),
  status: z
    .string({ error: 'Status is required' })
    .min(1, 'Status is required'),

  priority: z
    .string({ error: 'Priority is required' })
    .min(1, 'Priority is required'),
});
