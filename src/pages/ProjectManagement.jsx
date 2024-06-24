import { Box, Heading, Text, VStack, HStack, Button, Flex, IconButton, FormControl, FormLabel, Input, FormErrorMessage, Select, Textarea } from "@chakra-ui/react";
import { FaCog, FaBell, FaUserCircle } from "react-icons/fa";
import { useProjects, useAddProject, useUpdateProject, useDeleteProject, useMilestones, useAddMilestone, useTasks, useUpdateTask, useTags, useCategories } from "../integrations/supabase/index.js";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const projectSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  start_date: yup.date(),
  end_date: yup.date(),
  status: yup.string(),
});

const milestoneSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
  due_date: yup.date(),
  project_id: yup.number().required('Project is required'),
});

const ProjectManagement = () => {
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useProjects();
  const { data: milestones, isLoading: milestonesLoading, error: milestonesError } = useMilestones();
  const { data: tasks, isLoading: tasksLoading, error: tasksError } = useTasks();
  const { data: tags, isLoading: tagsLoading, error: tagsError } = useTags();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const addMilestone = useAddMilestone();
  const updateTask = useUpdateTask();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(projectSchema),
  });
  const { register: registerMilestone, handleSubmit: handleSubmitMilestone, formState: { errors: errorsMilestone }, setValue: setValueMilestone } = useForm({
    resolver: yupResolver(milestoneSchema),
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const onSubmitProject = async (data) => {
    if (selectedProject) {
      await updateProject.mutateAsync({ ...data, id: selectedProject.id });
    } else {
      await addProject.mutateAsync(data);
    }
    setSelectedProject(null);
  };

  const onSubmitMilestone = async (data) => {
    await addMilestone.mutateAsync(data);
    setSelectedMilestone(null);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setValue('name', project.name);
    setValue('description', project.description);
    setValue('start_date', new Date(project.start_date));
    setValue('end_date', new Date(project.end_date));
    setValue('status', project.status);
  };

  const handleDeleteProject = async (id) => {
    await deleteProject.mutateAsync(id);
  };

  const handleEditMilestone = (milestone) => {
    setSelectedMilestone(milestone);
    setValueMilestone('name', milestone.name);
    setValueMilestone('description', milestone.description);
    setValueMilestone('due_date', new Date(milestone.due_date));
    setValueMilestone('project_id', milestone.project_id);
  };

  const handleAssignTaskToProject = async (taskId, projectId) => {
    await updateTask.mutateAsync({ id: taskId, project_id: projectId });
  };

  if (projectsLoading || milestonesLoading || tasksLoading || tagsLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

  if (projectsError || milestonesError || tasksError || tagsError || categoriesError) {
    return <div>Error loading data</div>;
  }

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading>Project Management</Heading>
        <HStack spacing={4}>
          <IconButton aria-label="Notifications" icon={<FaBell />} />
          <IconButton aria-label="Settings" icon={<FaCog />} />
          <FaUserCircle size="24px" />
        </HStack>
      </Flex>
      <VStack as="form" onSubmit={handleSubmit(onSubmitProject)} spacing={4} mb={8}>
        <FormControl isInvalid={errors.name}>
          <FormLabel>Name</FormLabel>
          <Input type="text" {...register('name')} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea {...register('description')} />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.start_date}>
          <FormLabel>Start Date</FormLabel>
          <DatePicker selected={selectedProject?.start_date} onChange={(date) => setValue('start_date', date)} />
          <FormErrorMessage>{errors.start_date?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.end_date}>
          <FormLabel>End Date</FormLabel>
          <DatePicker selected={selectedProject?.end_date} onChange={(date) => setValue('end_date', date)} />
          <FormErrorMessage>{errors.end_date?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.status}>
          <FormLabel>Status</FormLabel>
          <Select {...register('status')}>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
          <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue">{selectedProject ? 'Update Project' : 'Add Project'}</Button>
      </VStack>
      <VStack as="form" onSubmit={handleSubmitMilestone(onSubmitMilestone)} spacing={4} mb={8}>
        <FormControl isInvalid={errorsMilestone.name}>
          <FormLabel>Name</FormLabel>
          <Input type="text" {...registerMilestone('name')} />
          <FormErrorMessage>{errorsMilestone.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errorsMilestone.description}>
          <FormLabel>Description</FormLabel>
          <Textarea {...registerMilestone('description')} />
          <FormErrorMessage>{errorsMilestone.description?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errorsMilestone.due_date}>
          <FormLabel>Due Date</FormLabel>
          <DatePicker selected={selectedMilestone?.due_date} onChange={(date) => setValueMilestone('due_date', date)} />
          <FormErrorMessage>{errorsMilestone.due_date?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errorsMilestone.project_id}>
          <FormLabel>Project</FormLabel>
          <Select {...registerMilestone('project_id')}>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </Select>
          <FormErrorMessage>{errorsMilestone.project_id?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue">{selectedMilestone ? 'Update Milestone' : 'Add Milestone'}</Button>
      </VStack>
      <VStack spacing={4}>
        {projects.map(project => (
          <Box key={project.id} w="full" p={4} bg="gray.100" borderRadius="md">
            <Heading size="md">{project.name}</Heading>
            <Text>{project.description}</Text>
            <Text>Start Date: {new Date(project.start_date).toLocaleDateString()}</Text>
            <Text>End Date: {new Date(project.end_date).toLocaleDateString()}</Text>
            <Text>Status: {project.status}</Text>
            <Text>Tags: {project.tags.map(tag => tag.name).join(', ')}</Text>
            <Text>Categories: {project.categories.map(category => category.name).join(', ')}</Text>
            <HStack spacing={2} mt={2}>
              <Button colorScheme="blue" onClick={() => handleEditProject(project)}>Edit</Button>
              <Button colorScheme="red" onClick={() => handleDeleteProject(project.id)}>Delete</Button>
            </HStack>
            <Heading size="sm" mt={4}>Milestones</Heading>
            <VStack spacing={2} mt={2}>
              {milestones.filter(milestone => milestone.project_id === project.id).map(milestone => (
                <Box key={milestone.id} w="full" p={2} bg="gray.200" borderRadius="md">
                  <Text>{milestone.name}</Text>
                  <Text>{milestone.description}</Text>
                  <Text>Due Date: {new Date(milestone.due_date).toLocaleDateString()}</Text>
                  <Button colorScheme="blue" onClick={() => handleEditMilestone(milestone)}>Edit</Button>
                </Box>
              ))}
            </VStack>
            <Heading size="sm" mt={4}>Tasks</Heading>
            <VStack spacing={2} mt={2}>
              {tasks.filter(task => task.project_id === project.id).map(task => (
                <Box key={task.id} w="full" p={2} bg="gray.200" borderRadius="md">
                  <Text>{task.title}</Text>
                  <Text>{task.description}</Text>
                  <Button colorScheme="blue" onClick={() => handleAssignTaskToProject(task.id, project.id)}>Assign to Project</Button>
                </Box>
              ))}
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ProjectManagement;