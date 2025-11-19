import { useCustomForm } from './components/form/useCustomForm';

export default function TaskPage() {
  // const {
  //   isOpen,
  //   onClose,
  //   handleAddTask,
  //   formHooks,
  //   formSubmit,
  //   onDelete,
  //   onEdit,
  //   taskId,
  //   data,
  //   onChangeFilter,
  //   filter

  // } = useTaskPage();

  const { formData, register, handleSubmit, reset } = useCustomForm({
    initialValues: { fullName: '' },
  });

  return (
    <form onSubmit={handleSubmit}>
      <input {...register('fullName')} placeholder='Name' />

      <div className='flex gap-4'>
        <button type='submit'>Submit</button>
        <button type='button' onClick={reset}>
          Cancel
        </button>
      </div>
    </form>
  );
}
