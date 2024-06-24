import { Box, Heading, Text, VStack, HStack, Button, Progress, Flex, IconButton } from "@chakra-ui/react";
import { FaCog, FaBell, FaUserCircle } from "react-icons/fa";

const ProjectOverview = () => {
  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading>Welcome, Team</Heading>
        <HStack spacing={4}>
          <IconButton aria-label="Notifications" icon={<FaBell />} />
          <IconButton aria-label="Settings" icon={<FaCog />} />
          <FaUserCircle size="24px" />
        </HStack>
      </Flex>
      <Text>Explore projects and track progress effortlessly.</Text>
      <Button mt={4} colorScheme="blackAlpha">Settings</Button>
      <VStack spacing={4} mt={8}>
        <HStack spacing={4} w="full">
          <Box flex="1" p={4} bg="gray.100" borderRadius="md">
            <Heading size="md">Upcoming meetings</Heading>
            <Text>Current week</Text>
          </Box>
          <Box flex="1" p={4} bg="gray.100" borderRadius="md">
            <Heading size="md">Planning for next</Heading>
            <Text>Current project status</Text>
          </Box>
        </HStack>
        <HStack spacing={4} w="full">
          <Box flex="1" p={4} bg="gray.100" borderRadius="md">
            <Heading size="md">Project completion rate</Heading>
            <Progress value={82} size="lg" colorScheme="green" />
          </Box>
          <Box flex="1" p={4} bg="gray.100" borderRadius="md">
            <Heading size="md">Project insights</Heading>
          </Box>
          <Box flex="1" p={4} bg="gray.100" borderRadius="md">
            <Heading size="md">Help & Support</Heading>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProjectOverview;