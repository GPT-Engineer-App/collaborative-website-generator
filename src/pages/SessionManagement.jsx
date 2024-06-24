import { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text, Button, HStack, useToast } from '@chakra-ui/react';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { supabase } from '../integrations/supabase/index.js';

const SessionManagement = () => {
  const { session } = useSupabaseAuth();
  const [sessions, setSessions] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchSessions = async () => {
      if (session) {
        const { data, error } = await supabase.from('sessions').select('*').eq('user_id', session.user.id);
        if (error) {
          console.error('Error fetching sessions:', error.message);
        } else {
          setSessions(data);
        }
      }
    };

    fetchSessions();
  }, [session]);

  const handleRevokeSession = async (sessionId) => {
    try {
      const { error } = await supabase.from('sessions').delete().eq('id', sessionId);
      if (error) throw error;
      setSessions(sessions.filter((s) => s.id !== sessionId));
      toast({
        title: 'Session revoked successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error revoking session.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <Box p={4}>
      <Heading mb={4}>Session Management</Heading>
      <VStack spacing={4}>
        {sessions.map((s) => (
          <Box key={s.id} p={4} bg="gray.100" borderRadius="md" w="full">
            <Text>Session ID: {s.id}</Text>
            <Text>Last Active: {new Date(s.last_active).toLocaleString()}</Text>
            <Text>Expires At: {new Date(s.expires_at).toLocaleString()}</Text>
            <HStack spacing={2} mt={2}>
              <Button colorScheme="red" onClick={() => handleRevokeSession(s.id)}>Revoke Session</Button>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default SessionManagement;