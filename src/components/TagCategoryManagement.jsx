import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, HStack, Text, useToast } from '@chakra-ui/react';
import { useAddTag, useUpdateTag, useDeleteTag, useTags, useAddCategory, useUpdateCategory, useDeleteCategory, useCategories } from '../integrations/supabase/index.js';

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
  const [tagName, setTagName] = useState('');
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (selectedTag) {
      setTagName(selectedTag.name);
    }
  }, [selectedTag]);

  useEffect(() => {
    if (selectedCategory) {
      setCategoryName(selectedCategory.name);
    }
  }, [selectedCategory]);

  const handleAddTag = async () => {
    try {
      await addTag.mutateAsync({ name: tagName });
      setTagName('');
      toast({
        title: 'Tag added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error adding tag.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateTag = async () => {
    try {
      await updateTag.mutateAsync({ id: selectedTag.id, name: tagName });
      setSelectedTag(null);
      setTagName('');
      toast({
        title: 'Tag updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating tag.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteTag = async (id) => {
    try {
      await deleteTag.mutateAsync(id);
      toast({
        title: 'Tag deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting tag.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddCategory = async () => {
    try {
      await addCategory.mutateAsync({ name: categoryName });
      setCategoryName('');
      toast({
        title: 'Category added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error adding category.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateCategory = async () => {
    try {
      await updateCategory.mutateAsync({ id: selectedCategory.id, name: categoryName });
      setSelectedCategory(null);
      setCategoryName('');
      toast({
        title: 'Category updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating category.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory.mutateAsync(id);
      toast({
        title: 'Category deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting category.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (tagsLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

  if (tagsError || categoriesError) {
    return <div>Error loading data.</div>;
  }

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Tag Name</FormLabel>
          <Input value={tagName} onChange={(e) => setTagName(e.target.value)} />
        </FormControl>
        <HStack spacing={2}>
          <Button colorScheme="blue" onClick={selectedTag ? handleUpdateTag : handleAddTag}>
            {selectedTag ? 'Update Tag' : 'Add Tag'}
          </Button>
          {selectedTag && (
            <Button colorScheme="red" onClick={() => setSelectedTag(null)}>
              Cancel
            </Button>
          )}
        </HStack>
        <VStack spacing={2} w="full">
          {tags.map((tag) => (
            <HStack key={tag.id} w="full" justify="space-between">
              <Text>{tag.name}</Text>
              <HStack spacing={2}>
                <Button size="sm" colorScheme="blue" onClick={() => setSelectedTag(tag)}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteTag(tag.id)}>
                  Delete
                </Button>
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
      <VStack spacing={4} mt={8}>
        <FormControl>
          <FormLabel>Category Name</FormLabel>
          <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        </FormControl>
        <HStack spacing={2}>
          <Button colorScheme="blue" onClick={selectedCategory ? handleUpdateCategory : handleAddCategory}>
            {selectedCategory ? 'Update Category' : 'Add Category'}
          </Button>
          {selectedCategory && (
            <Button colorScheme="red" onClick={() => setSelectedCategory(null)}>
              Cancel
            </Button>
          )}
        </HStack>
        <VStack spacing={2} w="full">
          {categories.map((category) => (
            <HStack key={category.id} w="full" justify="space-between">
              <Text>{category.name}</Text>
              <HStack spacing={2}>
                <Button size="sm" colorScheme="blue" onClick={() => setSelectedCategory(category)}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteCategory(category.id)}>
                  Delete
                </Button>
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default TagCategoryManagement;