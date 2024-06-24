import { Box, Heading, Text, VStack, HStack, Button, Flex, IconButton, Select, Input, Textarea, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { FaCog, FaBell, FaUserCircle } from "react-icons/fa";
import { useTasks, useAddTask, useUpdateTask, useDeleteTask, useTaskTags, useAddTaskTag, useComments, useAddComment } from "../integrations/supabase/index.js";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
  category: yup.string(),
  priority: yup.string(),
  status: yup.string(),
  due_date: yup.date(),
});

const TaskManagement = () => {
  const { data: tasks, isLoading: tasksLoading, error: tasksError } = useTasks();
  const { data: taskTags, isLoading: taskTagsLoading, error: taskTagsError } = useTaskTags();
  const { data: comments, isLoading: commentsLoading, error: commentsError } = useComments();
  const addTask = useAddTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const addTaskTag = useAddTaskTag();
  const addComment = useAddComment();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
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

  if (tasksLoading || taskTagsLoading || commentsLoading) {
    return <div>Loading...</div>;
  }

  if (tasksError || taskTagsError || commentsError) {
    return <div>Error loading data</div>;
  }

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
        <FormControl isInvalid={errors.title}>
          <FormLabel>Title</FormLabel>
          <Input type="text" {...register('title')} defaultValue={selectedTask?.title || ''} />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea {...register('description')} defaultValue={selectedTask?.description || ''} />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.category}>
          <FormLabel>Category</FormLabel>
          <Input type="text" {...register('category')} defaultValue={selectedTask?.category || ''} />
          <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.priority}>
          <FormLabel>Priority</FormLabel>
          <Select {...register('priority')} defaultValue={selectedTask?.priority || ''}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
          <FormErrorMessage>{errors.priority?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.status}>
          <FormLabel>Status</FormLabel>
          <Select {...register('status')} defaultValue={selectedTask?.status || ''}>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
          <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.due_date}>
          <FormLabel>Due Date</FormLabel>
          <Input type="date" {...register('due_date')} defaultValue={selectedTask?.due_date || ''} />
          <FormErrorMessage>{errors.due_date?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue">{selectedTask ? 'Update Task' : 'Add Task'}</Button>
      </VStack>
      <VStack spacing={4}>
        {tasks.map(task => (
          <Box key={task.id} w="full" p={4} bg="gray.100" borderRadius="md">
            <Heading size="md">{task.title}</Heading>
            <Text>{task.description}</Text>
            <Text>Category: {task.category}</Text>
            <Text>Priority: {task.priority}</Text>
            <Text>Status: {task.status}</Text>
            <Text>Due Date: {task.due_date}</Text>
            <HStack spacing={2} mt={2}>
              <Button colorScheme="blue" onClick={() => handleEdit(task)}>Edit</Button>
              <Button colorScheme="red" onClick={() => handleDelete(task.id)}>Delete</Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default TaskManagement;