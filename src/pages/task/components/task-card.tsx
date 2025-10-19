import { Calendar, Edit2, Trash2 } from 'lucide-react';
import type { TaskForm } from '../../../utils/type';
import { PRIORITY_COLOR, STATUS_COLOR } from '../../../utils/constant';

interface Props {
    data: TaskForm;
    onEdit: (id: string | undefined) => void
    onDelete: (id: string | undefined) => void
}
export const TaskCard = ({ data, onDelete, onEdit }: Props) => {
    const statusStyle = STATUS_COLOR[data?.status];
    const priorityStyle = PRIORITY_COLOR[data?.priority];

    return (
        <div className='border-b border-gray-200 py-4'>
            <div className='flex items-center  justify-between gap-3'>
                <div className='flex items-start gap-3 flex-1'>
                    <div className='flex-1 min-w-0'>
                        <h3 className={`font-medium text-gray-800 ${data?.status === 'done' && 'line-through'}`}>{data?.title}</h3>
                        <div className='flex items-center gap-2 mt-2 text-sm text-gray-500'>
                            <Calendar size={14} />
                            <span>{data?.dueDate}</span>
                            <span
                                className={`px-2 py-0.5 rounded text-xs font-medium ${statusStyle}`}
                            >
                                {data?.status}
                            </span>
                            <span
                                className={`px-2 py-0.5 rounded text-xs font-medium ${priorityStyle}`}
                            >
                                {data?.priority}
                            </span>
                        </div>
                    </div>
                </div>

                <div className='flex gap-2'>
                    <button
                        onClick={() => onEdit(data?.id)}
                        className='text-primary  p-1 cursor-pointer'
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(data.id)}
                        className='text-red-600 hover:text-red-700 p-1  cursor-pointer'
                        title='Delete task'
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
