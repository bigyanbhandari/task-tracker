import { X } from 'lucide-react';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../../../utils/constant';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { TaskForm } from '../../../utils/type';

interface Props {
    isOpen: boolean;
    onClose: VoidFunction;
    formHooks: UseFormReturn<TaskForm>;
    formSubmit: ReturnType<UseFormReturn<TaskForm>['handleSubmit']>;
    taskId: string | undefined | null;
}
export const TaskModal = ({
    isOpen,
    onClose,
    formHooks,
    formSubmit,
    taskId,
}: Props) => {
    if (!isOpen) return null;
    const { control } = formHooks;
    const title = taskId ? 'Update' : 'Add';
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
            <div className='bg-white shadow-lg rounded-lg w-full max-w-md p-6'>
                <div className='flex justify-between items-center mb-4'>
                    <h1 className='text-lg font-semibold'>{title} Task</h1>
                    <X
                        size={20}
                        className='cursor-pointer hover:text-red-600'
                        onClick={onClose}
                    />
                </div>

                <form className='space-y-4' onSubmit={formSubmit}>
                    <Controller
                        name='title'
                        control={control}
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <div>
                                <h3>Task Title</h3>
                                <input
                                    className='input h-10 px-4'
                                    value={value}
                                    onChange={onChange}
                                />
                                <p className='text-red-600  font-xs'>{error?.message}</p>
                            </div>
                        )}
                    />
                    <Controller
                        name='dueDate'
                        control={control}
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <div>
                                <h3>Due Date</h3>
                                <input
                                    className='input h-10 px-4'
                                    type='date'
                                    value={value}
                                    onChange={onChange}
                                />
                                <p className='text-red-600 font-xs'>{error?.message}</p>
                            </div>
                        )}
                    />
                    <Controller
                        name='status'
                        control={control}
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <div>
                                <h3>Status</h3>
                                <select
                                    value={value}
                                    onChange={onChange}
                                    className=' px-4 h-10 border border-gray-300 rounded-md 
                                                text-sm font-medium bg-white text-gray-700 
                                                focus:outline-none focus:ring-1 focus:[#1967d2] w-full'
                                >
                                    {STATUS_OPTIONS.map((option, i) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                            disabled={i === 0}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <p className='text-red-600 font-xs'>{error?.message}</p>
                            </div>
                        )}
                    />

                    <Controller
                        name='priority'
                        control={control}
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <div>
                                <h3>Priority</h3>
                                <select
                                    value={value}
                                    onChange={onChange}
                                    className=' px-4 h-10 border border-gray-300 rounded-md 
                                                text-sm font-medium bg-white text-gray-700 
                                                focus:outline-none focus:ring-1 focus:[#1967d2] w-full'
                                >
                                    {PRIORITY_OPTIONS.map((option, i) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                            disabled={i === 0}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <p className='text-red-600 font-xs'>{error?.message}</p>
                            </div>
                        )}
                    />
                    <div className='flex gap-4 items-center'>
                        <button
                            className=' gap-2 px-4 py-2  rounded-md text-sm font-medium transition-colors border border-gray-200 w-full cursor-pointer'
                            type='button'
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='bg-primary  gap-2 px-4 py-2   text-white rounded-md text-sm font-medium transition-colors cursor-pointer w-full'
                        >
                            {title} Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
