import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, HStack, Button, FormControl, FormLabel, Input, FormErrorMessage, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTags, useAddTag, useUpdateTag, useDeleteTag, useCategories, useAddCategory, useUpdateCategory, useDeleteCategory } from '../integrations/supabase/index.js';

const tagSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

const categorySchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

const TagManagement = () => {
  const { data: tags, isLoading: tagsLoading, error: tagsError } = useTags();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const addTag = useAddTag();
  const updateTag = useUpdateTag();
  const deleteTag = useDeleteTag();
  const addCategory = useAddCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(tagSchema),
  });
  const { register: registerCategory, handleSubmit: handleSubmitCategory, formState: { errors: errorsCategory }, setValue: setValueCategory } = useForm({
    resolver: yupResolver(categorySchema),
  });
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const toast = useToast();

  const onSubmitTag = async (data) => {
    if (selectedTag) {
      await updateTag.mutateAsync({ ...data, id: selectedTag.id });
    } else {
      await addTag.mutateAsync(data);
    }
    setSelectedTag(null);
    toast({
      title: 'Tag saved successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const onSubmitCategory = async (data) => {
    if (selectedCategory) {
      await updateCategory.mutateAsync({ ...data, id: selectedCategory.id });
    } else {
      await addCategory.mutateAsync(data);
    }
    setSelectedCategory(null);
    toast({
      title: 'Category saved successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEditTag = (tag) => {
    setSelectedTag(tag);
    setValue('name', tag.name);
  };

  const handleDeleteTag = async (id) => {
    await deleteTag.mutateAsync(id);
    toast({
      title: 'Tag deleted successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setValueCategory('name', category.name);
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory.mutateAsync(id);
    toast({
      title: 'Category deleted successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  if (tagsLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

  if (tagsError || categoriesError) {
    return <div>Error loading data</div>;
  }

  return (
    <Box p={4}>
      <Heading mb={4}>Tag Management</Heading>
      <VStack as="form" onSubmit={handleSubmit(onSubmitTag)} spacing={4} mb={8}>
        <FormControl isInvalid={errors.name}>
          <FormLabel>Name</FormLabel>
          <Input type="text" {...register('name')} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue">{selectedTag ? 'Update Tag' : 'Add Tag'}</Button>
      </VStack>
      <VStack spacing={4}>
        {tags.map(tag => (
          <Box key={tag.id} w="full" p={4} bg="gray.100" borderRadius="md">
            <HStack spacing={2} justify="space-between">
              <span>{tag.name}</span>
              <HStack spacing={2}>
                <Button colorScheme="blue" onClick={() => handleEditTag(tag)}>Edit</Button>
                <Button colorScheme="red" onClick={() => handleDeleteTag(tag.id)}>Delete</Button>
              </HStack>
            </HStack>
          </Box>
        ))}
      </VStack>
      <Heading mt={8} mb={4}>Category Management</Heading>
      <VStack as="form" onSubmit={handleSubmitCategory(onSubmitCategory)} spacing={4} mb={8}>
        <FormControl isInvalid={errorsCategory.name}>
          <FormLabel>Name</FormLabel>
          <Input type="text" {...registerCategory('name')} />
          <FormErrorMessage>{errorsCategory.name?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue">{selectedCategory ? 'Update Category' : 'Add Category'}</Button>
      </VStack>
      <VStack spacing={4}>
        {categories.map(category => (
          <Box key={category.id} w="full" p={4} bg="gray.100" borderRadius="md">
            <HStack spacing={2} justify="space-between">
              <span>{category.name}</span>
              <HStack spacing={2}>
                <Button colorScheme="blue" onClick={() => handleEditCategory(category)}>Edit</Button>
                <Button colorScheme="red" onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
              </HStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default TagManagement;