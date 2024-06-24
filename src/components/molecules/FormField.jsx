import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import Input from "../atoms/Input";

const FormField = ({ label, error, ...props }) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Input {...props} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormField;