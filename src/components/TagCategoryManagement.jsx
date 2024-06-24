import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, HStack, Text, useToast } from '@chakra-ui/react';
import { useTags, useAddTag, useUpdateTag, useDeleteTag, useCategories, useAddCategory, useUpdateCategory, useDeleteCategory } from '../integrations/supabase/index.js';

const TagCategoryManagement = () => {
  const { data: tags, isLoading: tagsLoading, error: tagsError } = useTags();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const addTag = useAddTag();
  const updateTag = useUpdateTag();
  const deleteTag = useDeleteTag();
  const addCategory = useAddCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const toast = useToast();
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleTagSubmit = async (data) => {
    if (selectedTag) {
      await updateTag.mutateAsync({ ...data, id: selectedTag.id });
    } else {
      await addTag.mutateAsync(data);
    }
    setSelectedTag(null);
  };

  const handleCategorySubmit = async (data) => {
    if (selectedCategory) {
      await updateCategory.mutateAsync({ ...data, id: selectedCategory.id });
    } else {
      await addCategory.mutateAsync(data);
    }
    setSelectedCategory(null);
  };

  const handleEditTag = (tag) => {
    setSelectedTag(tag);
  };

  const handleDeleteTag = async (id) => {
    await deleteTag.mutateAsync(id);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory.mutateAsync(id);
  };

  if (tagsLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

  if (tagsError || categoriesError) {
    return <div>Error loading data</div>;
  }

  return (
    <Box p={4}>
      <VStack as="form" onSubmit={handleTagSubmit} spacing={4} mb={8}>
        <FormControl>
          <FormLabel>Tag Name</FormLabel>
          <Input type="text" value={selectedTag?.name || ''} onChange={(e) => setSelectedTag({ ...selectedTag, name: e.target.value })} />
        </FormControl>
        <Button type="submit" colorScheme="blue">{selectedTag ? 'Update Tag' : 'Add Tag'}</Button>
      </VStack>
      <VStack as="form" onSubmit={handleCategorySubmit} spacing={4} mb={8}>
        <FormControl>
          <FormLabel>Category Name</FormLabel>
          <Input type="text" value={selectedCategory?.name || ''} onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })} />
        </FormControl>
        <Button type="submit" colorScheme="blue">{selectedCategory ? 'Update Category' : 'Add Category'}</Button>
      </VStack>
      <VStack spacing={4}>
        {tags.map(tag => (
          <Box key={tag.id} w="full" p={4} bg="gray.100" borderRadius="md">
            <Text>{tag.name}</Text>
            <HStack spacing={2} mt={2}>
              <Button colorScheme="blue" onClick={() => handleEditTag(tag)}>Edit</Button>
              <Button colorScheme="red" onClick={() => handleDeleteTag(tag.id)}>Delete</Button>
            </HStack>
          </Box>
        ))}
      </VStack>
      <VStack spacing={4}>
        {categories.map(category => (
          <Box key={category.id} w="full" p={4} bg="gray.100" borderRadius="md">
            <Text>{category.name}</Text>
            <HStack spacing={2} mt={2}>
              <Button colorScheme="blue" onClick={() => handleEditCategory(category)}>Edit</Button>
              <Button colorScheme="red" onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default TagCategoryManagement;