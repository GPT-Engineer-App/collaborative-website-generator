import { Box, VStack, Flex, HStack, IconButton, Heading } from "@chakra-ui/react";
import { FaBell, FaCog, FaUserCircle } from "react-icons/fa";
import TaskCard from "../organisms/TaskCard.jsx";
import FormField from "../molecules/FormField.jsx";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
  category: yup.string(),
  priority: yup.string(),
  status: yup.string(),
  due_date: yup.date(),
});

const TaskManagementTemplate = ({ tasks, onSubmit, onEdit, onDelete }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading>Task Management</Heading>
        <HStack spacing={4}>
          <IconButton aria-label="Notifications" icon={<FaBell />} />
          <IconButton aria-label="Settings" icon={<FaCog />} />
          <FaUserCircle size="24px" />
        </HStack>
      </Flex>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4} mb={8}>
        <FormField label="Title" error={errors.title?.message} {...register('title')} />
        <FormField label="Description" error={errors.description?.message} {...register('description')} />
        <FormField label="Category" error={errors.category?.message} {...register('category')} />
        <FormField label="Priority" error={errors.priority?.message} {...register('priority')} />
        <FormField label="Status" error={errors.status?.message} {...register('status')} />
        <FormField label="Due Date" error={errors.due_date?.message} {...register('due_date')} />
        <Button type="submit" colorScheme="blue">{selectedTask ? 'Update Task' : 'Add Task'}</Button>
      </VStack>
      <VStack spacing={4}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </VStack>
    </Box>
  );
};

export default TaskManagementTemplate;