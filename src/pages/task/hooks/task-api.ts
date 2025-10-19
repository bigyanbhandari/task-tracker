import axios from 'axios';
import type { TaskForm } from '../../../utils/type';
import useSWR from 'swr';

export const BASE_URL = 'http://localhost:3000';

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

// export const getTasks = (filter: Record<string, string>) => {
//   const params = new URLSearchParams();
//   if (filter) {
//     Object.entries(filter).forEach(([key, value]) => {
//       if (value && !(key === 'status' && value === 'all')) {
//         // Append only if value exists and status is not 'all'
//         params.append(key, value);
//       }
//     });
//   }

//   const { data, isLoading } = useSWR<TaskForm[]>(
//     `${BASE_URL}/tasks?${params.toString()}`,
//     fetcher
//   );

//   return {
//     data,
//     isLoading,
//   };
// };
export const getTasksKey = (filter: Record<string, string>) => {
  const params = new URLSearchParams();
  Object.entries(filter).forEach(([key, value]) => {
    if (value && !(key === 'status' && value === 'all')) {
      params.append(key, value);
    }
  });
  return `${BASE_URL}/tasks?${params.toString()}`;
};
export const getTasks = (filter: Record<string, string>) => {
  const key = getTasksKey(filter);

  const { data, isLoading } = useSWR<TaskForm[]>(key, fetcher);

  return {
    data,
    isLoading,
  };
};
export const getTasksById = (id: string | undefined | null) => {
  const { data, isLoading } = useSWR<TaskForm>(
    `${BASE_URL}/tasks/${id}`,
    fetcher
  );

  return {
    data,
    isLoading,
  };
};

export const addTask = async (data: TaskForm) => {
  const res = await axios.post(`${BASE_URL}/tasks`, data);
  return res?.data;
};

export const editTask = async (id: string | undefined, data: TaskForm) => {
  const res = await axios.put(`${BASE_URL}/tasks/${id}`, data);
  return res?.data;
};

export const deleteTask = async (id: string | undefined) => {
  const res = await axios.delete(`${BASE_URL}/tasks/${id}`);
  return res?.data;
};
