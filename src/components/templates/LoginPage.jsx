import { Box, Heading } from "@chakra-ui/react";
import LoginForm from "../organisms/LoginForm";

const LoginPage = ({ onSubmit, errors }) => {
  return (
    <Box p={4}>
      <Heading mb={4}>Login</Heading>
      <LoginForm onSubmit={onSubmit} errors={errors} />
    </Box>
  );
};

export default LoginPage;