import { Box, Text, HStack, Button } from "@chakra-ui/react";
import Heading from "../atoms/Heading.jsx";
import VotingSystem from "../molecules/VotingSystem.jsx";

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <Box w="full" p={4} bg="gray.100" borderRadius="md">
      <Heading size="md">{task.title}</Heading>
      <Text>{task.description}</Text>
      <Text>Category: {task.category}</Text>
      <Text>Priority: {task.priority}</Text>
      <Text>Status: {task.status}</Text>
      <Text>Due Date: {task.due_date}</Text>
      <VotingSystem taskId={task.id} />
      <HStack spacing={2} mt={2}>
        <Button colorScheme="blue" onClick={() => onEdit(task)}>Edit</Button>
        <Button colorScheme="red" onClick={() => onDelete(task.id)}>Delete</Button>
      </HStack>
    </Box>
  );
};

export default TaskCard;