import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, VStack, Avatar, Textarea } from '@chakra-ui/react';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { supabase } from '../integrations/supabase/index.js';
import { useEffect, useState } from 'react';

const schema = yup.object().shape({
  bio: yup.string().required('Bio is required'),
  avatar_url: yup.string().url('Invalid URL').required('Avatar URL is required'),
});

const Profile = () => {
  const { session } = useSupabaseAuth();
  const [profile, setProfile] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
      if (error) {
        console.error('Error fetching profile:', error.message);
      } else {
        setProfile(data);
        setValue('bio', data.bio);
        setValue('avatar_url', data.avatar_url);
      }
    };

    if (session) {
      fetchProfile();
    }
  }, [session, setValue]);

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase.from('profiles').update(data).eq('id', session.user.id);
      if (error) throw error;
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Box p={4}>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
        <Avatar src={profile.avatar_url} size="xl" />
        <FormControl isInvalid={errors.bio}>
          <FormLabel>Bio</FormLabel>
          <Textarea {...register('bio')} />
          <FormErrorMessage>{errors.bio?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.avatar_url}>
          <FormLabel>Avatar URL</FormLabel>
          <Input type="url" {...register('avatar_url')} />
          <FormErrorMessage>{errors.avatar_url?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue">Update Profile</Button>
      </VStack>
    </Box>
  );
};

export default Profile;