import { SearchFilterSection } from './components/search-filter';
import { TaskCard } from './components/task-card';
import { TaskModal } from './components/task-modal';
import { useTaskPage } from './hooks/use-task-page';

export default function TaskPage() {
  const {
    isOpen,
    onClose,
    handleAddTask,
    formHooks,
    formSubmit,
    onDelete,
    onEdit,
    taskId,
    data,
    onChangeFilter,
    filter

  } = useTaskPage();
  return (
    <div className='space-y-5'>
      <section>
        <div className='text-3xl font-semibold'>Task Tracker</div>
        <div>
          Stay organized and manage your daily tasks effortlessly. Add, edit,
          delete, and track your to-dos with sorting, filtering, and search —
          all in one simple interface.
        </div>
      </section>
      <SearchFilterSection onAddTask={handleAddTask} onChangeFilter={onChangeFilter} filter={filter} />
      <div className='bg-white  border-gray-400 rounded-md p-4 hover:shadow-md transition-shadow h-[60vh] overflow-y-scroll'>
        {data?.length ? data?.map((item) => (
          <TaskCard
            key={item.id}
            data={item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )) : <div className='grid place-content-center h-full'>
          <div className='text-4xl'>No Data...</div>
          <div className='text-lg'>please add Task</div>
        </div>}
      </div>
      <TaskModal
        isOpen={isOpen}
        onClose={onClose}
        formHooks={formHooks}
        formSubmit={formSubmit}
        taskId={taskId}
      />
    </div>
  );
}
