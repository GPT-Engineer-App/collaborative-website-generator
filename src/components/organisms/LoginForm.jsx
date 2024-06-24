import { VStack, Button } from "@chakra-ui/react";
import FormField from "../molecules/FormField";

const LoginForm = ({ onSubmit, errors }) => {
  return (
    <VStack as="form" onSubmit={onSubmit} spacing={4}>
      <FormField label="Email" name="email" error={errors.email} />
      <FormField label="Password" name="password" type="password" error={errors.password} />
      <Button type="submit" colorScheme="blue">Login</Button>
    </VStack>
  );
};

export default LoginForm;