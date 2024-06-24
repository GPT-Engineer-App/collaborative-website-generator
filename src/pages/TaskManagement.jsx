import { Box, Heading, Text, VStack, HStack, Button, Flex, IconButton } from "@chakra-ui/react";
import { FaCog, FaBell, FaUserCircle } from "react-icons/fa";

const TaskManagement = () => {
  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading>Welcome back to Faving</Heading>
        <HStack spacing={4}>
          <IconButton aria-label="Notifications" icon={<FaBell />} />
          <IconButton aria-label="Settings" icon={<FaCog />} />
          <FaUserCircle size="24px" />
        </HStack>
      </Flex>
      <Text>Track progress and boost productivity with Faving's intuitive features.</Text>
      <Button mt={4} colorScheme="blackAlpha">Add task</Button>
      <VStack spacing={4} mt={8}>
        <Box w="full" p={4} bg="gray.100" borderRadius="md">
          <Heading size="md">My tasks</Heading>
          <Text>2 tasks in</Text>
        </Box>
        <Box w="full" p={4} bg="gray.100" borderRadius="md">
          <Heading size="md">Total hours worked</Heading>
        </Box>
      </VStack>
    </Box>
  );
};

export default TaskManagement;