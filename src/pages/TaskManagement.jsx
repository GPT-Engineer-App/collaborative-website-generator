import { useTasks, useAddTask, useUpdateTask, useDeleteTask } from "../integrations/supabase/index.js";
import { useState } from 'react';
import TaskManagementTemplate from "../components/templates/TaskManagementTemplate.jsx";

const TaskManagement = () => {
  const { data: tasks, isLoading: tasksLoading, error: tasksError } = useTasks();
  
  const addTask = useAddTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  
  const [selectedTask, setSelectedTask] = useState(null);

  const onSubmit = async (data) => {
    if (selectedTask) {
      await updateTask.mutateAsync({ ...data, id: selectedTask.id });
    } else {
      await addTask.mutateAsync(data);
    }
    setSelectedTask(null);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  const handleDelete = async (id) => {
    await deleteTask.mutateAsync(id);
  };

  if (tasksLoading) {
    return <div>Loading...</div>;
  }

  if (tasksError) {
    return <div>Error loading data</div>;
  }

  return (
    <TaskManagementTemplate 
      tasks={tasks} 
      onSubmit={onSubmit} 
      onEdit={handleEdit} 
      onDelete={handleDelete} 
    />
  );
};

export default TaskManagement;