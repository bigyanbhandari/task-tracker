import {
    ArrowUpDown,
    Filter,
    ListChevronsDownUp,
    Plus,
    Search,
} from 'lucide-react';
import { PRIORITY_OPTIONS, SORT_OPTIONS } from '../../../utils/constant';
import { useDebounce } from '../hooks/use-debounce';
import { useEffect, useState } from 'react';
interface Props {
    onAddTask: VoidFunction
    onChangeFilter: (key: string, val: string) => void
    filter: Record<string, string>
}

export const SearchFilterSection = ({ onAddTask, onChangeFilter, filter }: Props) => {

    const [searchInput, setSearchInput] = useState('');
    const debouncedValue = useDebounce({ value: searchInput, delay: 2000 });

    useEffect(() => {
        onChangeFilter('title', debouncedValue);
    }, [debouncedValue]);

    return (
        <div className='rounded-md shadow-xs bg-white p-4 space-y-4'>
            <div className='flex gap-4'>
                <div className='flex-1 relative'>
                    <Search
                        className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                        size={18}
                    />
                    <input
                        type='text'
                        placeholder='Search tasks...'
                        onChange={(e) => setSearchInput(e.target.value)}

                        className='input'
                    />
                </div>
                <button
                    onClick={onAddTask}
                    className='bg-primary flex items-center gap-2 px-4 py-2   text-white rounded-md text-sm font-medium transition-colors cursor-pointer'
                >
                    <Plus size={18} />
                    Add Task
                </button>
            </div>
            <div className='flex items-center gap-4'>
                <Filter size={18} className='text-gray-600' />
                <div className='flex gap-2'>
                    {['all', 'todo', 'pending', 'done'].map((status) => (
                        <button
                            key={status}
                            onClick={() => onChangeFilter('status', status)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${filter.status === status ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                } `}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
                <div className='relative w-fit'>
                    <ArrowUpDown
                        size={18}
                        className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
                    />

                    <select
                        onChange={(e) => onChangeFilter('_sort', e.target.value)}
                        className='appearance-none pl-10 pr-4 h-9 border border-gray-300 rounded-md 
                        text-sm font-medium bg-white text-gray-700 
                        focus:outline-none focus:ring-1 focus:[#1967d2]'
                    >
                        <option value='' disabled>
                            Sort by
                        </option>
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='relative w-fit'>
                    <ListChevronsDownUp
                        size={18}
                        className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
                    />

                    <select
                        onChange={(e) => onChangeFilter('priority', e.target.value)}
                        className='appearance-none pl-10 pr-4 h-9 border border-gray-300 rounded-md 
                     text-sm font-medium bg-white text-gray-700 
                     focus:outline-none focus:ring-1 focus:ring-[#1967d2]'
                    >
                        {PRIORITY_OPTIONS.map((option, i) => (
                            <option key={option.value} value={option.value} disabled={i === 0}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};
