import { Box } from "@chakra-ui/react";
import Heading from "../atoms/Heading.jsx";

const Card = ({ title, children, ...props }) => {
  return (
    <Box p={4} bg="gray.100" borderRadius="md" {...props}>
      <Heading size="md" mb={4}>{title}</Heading>
      {children}
    </Box>
  );
};

export default Card;