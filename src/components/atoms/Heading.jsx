import { Heading as ChakraHeading } from "@chakra-ui/react";

const Heading = ({ children, ...props }) => {
  return <ChakraHeading {...props}>{children}</ChakraHeading>;
};

export default Heading;