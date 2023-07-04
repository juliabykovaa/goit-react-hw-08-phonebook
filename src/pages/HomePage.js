import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const Homepage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      height="100vh"
    >
      <Heading as="h1" >
        Your phonebook
      </Heading>
    </Box>
  );
};

export default Homepage;
