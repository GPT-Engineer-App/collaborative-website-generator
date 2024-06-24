import { Box, Flex, HStack, Link, IconButton, useDisclosure, VStack, CloseButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.800" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseButton /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <NavLink to="/">
            <Link color="white">Home</Link>
          </NavLink>
          <HStack
            as="nav"
            spacing={4}
            display={{ base: "none", md: "flex" }}
          >
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
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <VStack as="nav" spacing={4}>
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
          </VStack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;