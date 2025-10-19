import { useForm } from 'react-hook-form';
import { taskSchema } from '../schema/task-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TaskForm } from '../../../utils/type';
import { useEffect, useState } from 'react';
import {
  addTask,
  BASE_URL,
  deleteTask,
  editTask,
  getTasks,
  getTasksById,
  getTasksKey,
} from './task-api';
import toast from 'react-hot-toast';
import { mutate } from 'swr';

const defaultValues = {
  title: '',
  dueDate: '',
  status: '',
  priority: '',
};
export const useTaskPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string | undefined | null>(null);
  const [filter, setFilter] = useState({
    status: '',
    priority: '',
  });

  const { data } = getTasks(filter);
  const key = getTasksKey(filter);

  const { data: dataById } = getTasksById(taskId);
  const formHooks = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    mode: 'onChange',
    defaultValues,
  });

  const { handleSubmit, reset } = formHooks;
  function onClose() {
    setIsOpen(false);
    reset(defaultValues);
    setTaskId(null);
  }
  function handleAddTask() {
    setIsOpen(true);
  }
  function onSubmitHandler(data: TaskForm) {
    if (taskId) {
      editTask(taskId, data)
        .then(() => {
          toast.success('Task updated successfully');
          onSucces();
        })
        .catch((err) => toast.error(err?.message));
    } else {
      addTask(data)
        .then(() => {
          toast.success('Task created successfully');
          onSucces();
        })
        .catch((err) => toast.error(err?.message));
    }
  }
  function onDelete(id: string | undefined) {
    deleteTask(id).then((res) => {
      if (res) {
        toast.error('Task deleted successfully');
        mutate(key);
      }
    });
  }

  function onEdit(id: string | undefined) {
    setTaskId(id);
    setIsOpen(true);
  }

  function onSucces() {
    onClose();

    mutate(key);
  }

  function onChangeFilter(key: string, value: string) {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  }
  useEffect(() => {
    if (isOpen && taskId) {
      reset({
        title: dataById?.title,
        dueDate: dataById?.dueDate,
        status: dataById?.status,
        priority: dataById?.priority,
      });
    }
  }, [taskId, dataById]);

  return {
    formHooks,
    formSubmit: handleSubmit(onSubmitHandler),
    isOpen,
    onClose,
    handleAddTask,
    onEdit,
    onDelete,
    taskId,
    data,
    onChangeFilter,
    filter,
  };
};
