import { Box, Heading, Text, VStack, HStack, Button, Flex, IconButton } from "@chakra-ui/react";
import { FaCog, FaBell, FaUserCircle } from "react-icons/fa";

const ProjectManagement = () => {
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
      <VStack spacing={4} mt={8}>
        <Box w="full" p={4} bg="gray.100" borderRadius="md">
          <Heading size="md">Project Templates</Heading>
          <VStack spacing={2} mt={2}>
            <Button w="full" colorScheme="gray">Template 1</Button>
            <Button w="full" colorScheme="gray">Template 2</Button>
            <Button w="full" colorScheme="gray">Template 3</Button>
            <Button w="full" colorScheme="gray">Template 4</Button>
            <Button w="full" colorScheme="gray">Template 5</Button>
          </VStack>
        </Box>
        <Box w="full" p={4} bg="gray.100" borderRadius="md">
          <Heading size="md">To Do</Heading>
          <VStack spacing={2} mt={2}>
            <Button w="full" colorScheme="gray">Task 1</Button>
            <Button w="full" colorScheme="gray">Task 2</Button>
            <Button w="full" colorScheme="gray">Task 3</Button>
          </VStack>
        </Box>
        <Box w="full" p={4} bg="gray.100" borderRadius="md">
          <Heading size="md">In Progress</Heading>
          <VStack spacing={2} mt={2}>
            <Button w="full" colorScheme="gray">Task 4</Button>
            <Button w="full" colorScheme="gray">Task 5</Button>
          </VStack>
        </Box>
        <Box w="full" p={4} bg="gray.100" borderRadius="md">
          <Heading size="md">Completed</Heading>
          <VStack spacing={2} mt={2}>
            <Button w="full" colorScheme="gray">Task 6</Button>
            <Button w="full" colorScheme="gray">Task 7</Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default ProjectManagement;