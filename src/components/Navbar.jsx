import { Box, Flex, HStack, Link, Button } from "@chakra-ui/react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="gray.800" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <NavLink to="/">
            <Link color="white">Home</Link>
          </NavLink>
          <NavLink to="/dashboard">
            <Link color="white">Dashboard</Link>
          </NavLink>
          <NavLink to="/projects">
            <Link color="white">Projects</Link>
          </NavLink>
          <NavLink to="/tasks">
            <Link color="white">Tasks</Link>
          </NavLink>
          <NavLink to="/teams">
            <Link color="white">Teams</Link>
          </NavLink>
          <NavLink to="/settings">
            <Link color="white">Settings</Link>
          </NavLink>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;