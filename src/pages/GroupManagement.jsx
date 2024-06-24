import { Box, Heading, Text, VStack, HStack, Button, Flex, IconButton, FormControl, FormLabel, Input, FormErrorMessage, Select, Textarea, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { FaCog, FaBell, FaUserCircle } from "react-icons/fa";
import { useGroups, useAddGroup, useUpdateGroup, useDeleteGroup, useGroupMembers, useAddGroupMember, useUpdateGroupMember, useDeleteGroupMember } from "../integrations/supabase/index.js";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

const groupSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string(),
});

const memberSchema = yup.object().shape({
  user_id: yup.string().required('User ID is required'),
  role: yup.string().required('Role is required'),
});

const GroupManagement = () => {
  const { data: groups, isLoading: groupsLoading, error: groupsError } = useGroups();
  const { data: groupMembers, isLoading: groupMembersLoading, error: groupMembersError } = useGroupMembers();
  const addGroup = useAddGroup();
  const updateGroup = useUpdateGroup();
  const deleteGroup = useDeleteGroup();
  const addGroupMember = useAddGroupMember();
  const updateGroupMember = useUpdateGroupMember();
  const deleteGroupMember = useDeleteGroupMember();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(groupSchema),
  });
  const { register: registerMember, handleSubmit: handleSubmitMember, formState: { errors: errorsMember }, setValue: setValueMember } = useForm({
    resolver: yupResolver(memberSchema),
  });
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const onSubmitGroup = async (data) => {
    if (selectedGroup) {
      await updateGroup.mutateAsync({ ...data, id: selectedGroup.id });
    } else {
      await addGroup.mutateAsync(data);
    }
    setSelectedGroup(null);
  };

  const onSubmitMember = async (data) => {
    if (selectedMember) {
      await updateGroupMember.mutateAsync({ ...data, id: selectedMember.id });
    } else {
      await addGroupMember.mutateAsync(data);
    }
    setSelectedMember(null);
  };

  const handleEditGroup = (group) => {
    setSelectedGroup(group);
    setValue('name', group.name);
    setValue('description', group.description);
  };

  const handleDeleteGroup = async (id) => {
    await deleteGroup.mutateAsync(id);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setValueMember('user_id', member.user_id);
    setValueMember('role', member.role);
  };

  const handleDeleteMember = async (id) => {
    await deleteGroupMember.mutateAsync(id);
  };

  if (groupsLoading || groupMembersLoading) {
    return <Spinner />;
  }

  if (groupsError || groupMembersError) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error loading data
      </Alert>
    );
  }

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading>Group Management</Heading>
        <HStack spacing={4}>
          <IconButton aria-label="Notifications" icon={<FaBell />} />
          <IconButton aria-label="Settings" icon={<FaCog />} />
          <FaUserCircle size="24px" />
        </HStack>
      </Flex>
      <VStack as="form" onSubmit={handleSubmit(onSubmitGroup)} spacing={4} mb={8}>
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
        <Button type="submit" colorScheme="blue">{selectedGroup ? 'Update Group' : 'Add Group'}</Button>
      </VStack>
      <VStack as="form" onSubmit={handleSubmitMember(onSubmitMember)} spacing={4} mb={8}>
        <FormControl isInvalid={errorsMember.user_id}>
          <FormLabel>User ID</FormLabel>
          <Input type="text" {...registerMember('user_id')} />
          <FormErrorMessage>{errorsMember.user_id?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errorsMember.role}>
          <FormLabel>Role</FormLabel>
          <Select {...registerMember('role')}>
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </Select>
          <FormErrorMessage>{errorsMember.role?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue">{selectedMember ? 'Update Member' : 'Add Member'}</Button>
      </VStack>
      <VStack spacing={4}>
        {groups.map(group => (
          <Box key={group.id} w="full" p={4} bg="gray.100" borderRadius="md">
            <Heading size="md">{group.name}</Heading>
            <Text>{group.description}</Text>
            <HStack spacing={2} mt={2}>
              <Button colorScheme="blue" onClick={() => handleEditGroup(group)}>Edit</Button>
              <Button colorScheme="red" onClick={() => handleDeleteGroup(group.id)}>Delete</Button>
            </HStack>
            <Heading size="sm" mt={4}>Members</Heading>
            <VStack spacing={2} mt={2}>
              {groupMembers.filter(member => member.group_id === group.id).map(member => (
                <Box key={member.id} w="full" p={2} bg="gray.200" borderRadius="md">
                  <Text>User ID: {member.user_id}</Text>
                  <Text>Role: {member.role}</Text>
                  <HStack spacing={2} mt={2}>
                    <Button colorScheme="blue" onClick={() => handleEditMember(member)}>Edit</Button>
                    <Button colorScheme="red" onClick={() => handleDeleteMember(member.id)}>Delete</Button>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default GroupManagement;