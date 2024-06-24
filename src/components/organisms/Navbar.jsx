import { Box, Flex, HStack, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="gray.800" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <NavLink to="/">
            <Link color="white">Home</Link>
          </NavLink>
          <NavLink to="/project-overview">
            <Link color="white">Project Overview</Link>
          </NavLink>
          <NavLink to="/task-management">
            <Link color="white">Task Management</Link>
          </NavLink>
          <NavLink to="/dashboard">
            <Link color="white">Dashboard</Link>
          </NavLink>
          <NavLink to="/project-management">
            <Link color="white">Project Management</Link>
          </NavLink>
          <NavLink to="/group-management">
            <Link color="white">Group Management</Link>
          </NavLink>
          <NavLink to="/file-management">
            <Link color="white">File Management</Link>
          </NavLink>
          <NavLink to="/productivity">
            <Link color="white">Productivity</Link>
          </NavLink>
          <NavLink to="/session-management">
            <Link color="white">Session Management</Link>
          </NavLink>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;