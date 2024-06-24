import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import { useUserScores } from '../integrations/supabase/index.js';
import ProductivityChart from '../components/ProductivityChart.jsx';

const Productivity = () => {
  const { data: userScores, isLoading, error } = useUserScores();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (userScores) {
      setChartData(userScores.map(score => ({
        date: new Date(score.date).toLocaleDateString(),
        score: score.score,
      })));
    }
  }, [userScores]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading productivity data.</div>;
  }

  return (
    <Box p={4}>
      <Heading mb={4}>Productivity</Heading>
      <VStack spacing={4}>
        <ProductivityChart data={chartData} />
        <Box p={4} bg="gray.100" borderRadius="md" w="full">
          <Heading size="md">Productivity History</Heading>
          {userScores.map(score => (
            <Text key={score.id}>{new Date(score.date).toLocaleDateString()}: {score.score}</Text>
          ))}
        </Box>
      </VStack>
    </Box>
  );
};

export default Productivity;