import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, VStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth, SupabaseAuthUI } from '../integrations/supabase/auth.jsx';
import { supabase } from '../integrations/supabase/index.js';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const { session, loading } = useSupabaseAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <Button type="submit" colorScheme="blue">Login</Button>
      </VStack>
      <Text mt={4}>Don't have an account? <a href="/register">Register</a></Text>
      <SupabaseAuthUI />
    </Box>
  );
};

export default Login;