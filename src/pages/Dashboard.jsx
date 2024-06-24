import { Box, Heading, Text, VStack, HStack, Button, Flex, IconButton, Image } from "@chakra-ui/react";
import { FaCog, FaBell, FaUserCircle } from "react-icons/fa";

const Dashboard = () => {
  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading>Dashboard</Heading>
        <HStack spacing={4}>
          <IconButton aria-label="Notifications" icon={<FaBell />} />
          <IconButton aria-label="Settings" icon={<FaCog />} />
          <FaUserCircle size="24px" />
        </HStack>
      </Flex>
      <Text>Welcome back, John! Here's a quick overview of your projects and tasks.</Text>
      <VStack spacing={4} mt={8}>
        <Flex wrap="wrap" justify="space-between" w="full">
          <Box flex="1" p={4} bg="gray.100" borderRadius="md" m={2} minW="250px">
            <Heading size="md">Project A</Heading>
            <Text>A brief description of Project A. This project involves...</Text>
            <Image src="/images/project-a.jpg" alt="Project A" />
            <Button mt={2} colorScheme="orange">View</Button>
          </Box>
          <Box flex="1" p={4} bg="gray.100" borderRadius="md" m={2} minW="250px">
            <Heading size="md">Project B</Heading>
            <Text>A brief description of Project B. This project involves...</Text>
            <Image src="/images/project-b.jpg" alt="Project B" />
            <Button mt={2} colorScheme="orange">View</Button>
          </Box>
          <Box flex="1" p={4} bg="gray.100" borderRadius="md" m={2} minW="250px">
            <Heading size="md">Project C</Heading>
            <Text>A brief description of Project C. This project involves...</Text>
            <Image src="/images/project-c.jpg" alt="Project C" />
            <Button mt={2} colorScheme="orange">View</Button>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Dashboard;