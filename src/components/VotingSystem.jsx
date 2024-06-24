import { Box, Button, Flex, Text, VStack, HStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb, useToast } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useAddVote, useUpdateVote, useDeleteVote, useAddSliderVote, useUpdateSliderVote, useDeleteSliderVote, useVotes, useSliderVotes } from "../integrations/supabase/index.js";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { useState, useEffect } from "react";

const VotingSystem = ({ taskId }) => {
  const { session } = useSupabaseAuth();
  const { data: votes, isLoading: votesLoading, error: votesError } = useVotes();
  const { data: sliderVotes, isLoading: sliderVotesLoading, error: sliderVotesError } = useSliderVotes();
  const addVote = useAddVote();
  const updateVote = useUpdateVote();
  const deleteVote = useDeleteVote();
  const addSliderVote = useAddSliderVote();
  const updateSliderVote = useUpdateSliderVote();
  const deleteSliderVote = useDeleteSliderVote();
  const toast = useToast();
  const [userVote, setUserVote] = useState(null);
  const [userSliderVote, setUserSliderVote] = useState(null);

  useEffect(() => {
    if (votes && session) {
      const vote = votes.find(vote => vote.task_id === taskId && vote.user_id === session.user.id);
      setUserVote(vote);
    }
    if (sliderVotes && session) {
      const sliderVote = sliderVotes.find(sliderVote => sliderVote.task_id === taskId && sliderVote.user_id === session.user.id);
      setUserSliderVote(sliderVote);
    }
  }, [votes, sliderVotes, session, taskId]);

  const handleVote = async (voteValue) => {
    if (!session) {
      toast({
        title: "You must be logged in to vote.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      if (userVote) {
        await updateVote.mutateAsync({ ...userVote, vote: voteValue });
      } else {
        await addVote.mutateAsync({ user_id: session.user.id, task_id: taskId, vote: voteValue });
      }
      toast({
        title: "Vote submitted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error submitting vote.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSliderVote = async (rating) => {
    if (!session) {
      toast({
        title: "You must be logged in to rate.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      if (userSliderVote) {
        await updateSliderVote.mutateAsync({ ...userSliderVote, rating });
      } else {
        await addSliderVote.mutateAsync({ user_id: session.user.id, task_id: taskId, rating });
      }
      toast({
        title: "Rating submitted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error submitting rating.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRetractVote = async () => {
    if (!session) {
      toast({
        title: "You must be logged in to retract your vote.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      if (userVote) {
        await deleteVote.mutateAsync(userVote.id);
        setUserVote(null);
      }
      if (userSliderVote) {
        await deleteSliderVote.mutateAsync(userSliderVote.id);
        setUserSliderVote(null);
      }
      toast({
        title: "Vote retracted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error retracting vote.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (votesLoading || sliderVotesLoading) {
    return <div>Loading...</div>;
  }

  if (votesError || sliderVotesError) {
    return <div>Error loading votes.</div>;
  }

  const upvotes = votes.filter(vote => vote.task_id === taskId && vote.vote === 1).length;
  const downvotes = votes.filter(vote => vote.task_id === taskId && vote.vote === -1).length;
  const averageRating = sliderVotes.filter(sliderVote => sliderVote.task_id === taskId).reduce((acc, sliderVote) => acc + sliderVote.rating, 0) / sliderVotes.length || 0;

  return (
    <Box p={4} bg="gray.100" borderRadius="md">
      <VStack spacing={4}>
        <HStack spacing={4}>
          <Button leftIcon={<FaThumbsUp />} colorScheme="green" onClick={() => handleVote(1)} isDisabled={userVote?.vote === 1}>
            Upvote ({upvotes})
          </Button>
          <Button leftIcon={<FaThumbsDown />} colorScheme="red" onClick={() => handleVote(-1)} isDisabled={userVote?.vote === -1}>
            Downvote ({downvotes})
          </Button>
        </HStack>
        <Text>Average Rating: {averageRating.toFixed(1)}</Text>
        <Slider defaultValue={userSliderVote?.rating || 0} min={1} max={5} step={1} onChange={handleSliderVote}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Button colorScheme="blue" onClick={handleRetractVote}>
          Retract Vote
        </Button>
      </VStack>
    </Box>
  );
};

export default VotingSystem;