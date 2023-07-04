import ContactBook from 'components/ContactBook/ContactBook';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/FilterContactBook/FilterContactBook';
import { useSelector } from 'react-redux';
import { Container, Heading, Flex, Box } from '@chakra-ui/react';

const Contacts = () => {
  const isLogged = useSelector(state => state.auth.auth.isLogged);

  if (!isLogged) {
    return (
      <Box display="flex" justifyContent="center" height="100vh">
        <Heading as="h1">Please log in to view contacts.</Heading>
      </Box>
    );
  }
  return (
    <Container maxWidth="lg" mt={8}>
      <Heading as="h1" textAlign="center" mb={4}>
        Phonebook
      </Heading>
      <Flex direction="column" align="center" mt={8}>
        <ContactForm />

        <Heading as="h2" size="lg" mt={8} mb={4}>
          Contacts
        </Heading>
        <Filter />
        <ContactBook />
      </Flex>
    </Container>
  );
};

export default Contacts;
