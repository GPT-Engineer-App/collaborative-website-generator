// Update this page (the content is just a fallback if you fail and example)
// Use chakra-ui
import { Container, Text, VStack, Heading, Button } from "@chakra-ui/react";

// Example of using react-icons
// import { FaRocket } from "react-icons/fa";
// <IconButton aria-label="Add" icon={<FaRocket />} size="lg" />; // IconButton would also have to be imported from chakra

const Index = () => {
  return (
    <Container centerContent maxW={{ base: "container.sm", md: "container.md" }} height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={6}>
        <Heading fontSize={{ base: "2xl", md: "3xl" }}>Welcome to the Project Management App</Heading>
        <Text fontSize={{ base: "md", md: "lg" }}>Manage your projects, tasks, teams, and settings all in one place.</Text>
        <Button colorScheme="teal" size="lg">Go to Dashboard</Button>
        <Button colorScheme="teal" size="lg">View Projects</Button>
        <Button colorScheme="teal" size="lg">Manage Tasks</Button>
        <Button colorScheme="teal" size="lg">Teams</Button>
        <Button colorScheme="teal" size="lg">Settings</Button>
      </VStack>
    </Container>
  );
};

export default Index;
