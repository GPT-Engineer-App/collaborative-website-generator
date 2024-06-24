import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, VStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/index.js';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error.message);
    }
  };

  return (
    <Box p={4}>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
        <FormControl isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input type="email" {...register('email')} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register('password')} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue">Register</Button>
      </VStack>
      <Text mt={4}>Already have an account? <a href="/login">Login</a></Text>
    </Box>
  );
};

export default Register;