import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { useAddFile } from '../integrations/supabase/index.js';
import { useToast } from 'react-toastify';

const FileUpload = ({ projectId }) => {
  const toast = useToast();
  const addFile = useAddFile();

  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      await addFile.mutateAsync({ project_id: projectId, files: formData });
      toast({
        title: 'File uploaded successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error uploading file.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [addFile, projectId, toast]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box p={4} bg="gray.100" borderRadius="md">
      <VStack spacing={4}>
        <Box {...getRootProps()} p={4} bg="white" border="2px dashed gray" borderRadius="md" cursor="pointer">
          <input {...getInputProps()} />
          <Text>Drag & drop files here, or click to select files</Text>
        </Box>
        <Button colorScheme="blue" onClick={() => document.querySelector('input[type="file"]').click()}>
          Upload Files
        </Button>
      </VStack>
    </Box>
  );
};

export default FileUpload;