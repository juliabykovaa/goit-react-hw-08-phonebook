import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from 'store/thunk';
import { VStack, Box, Button } from '@chakra-ui/react';


function ContactBook() {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  console.log('contacts', contacts)
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.auth.auth.isLogged);

  useEffect(() => {
    if (isLogged) {
      dispatch(fetchContacts());

    }
  }, [dispatch, isLogged]);

const getFilteredContacts = () => {
  const filterNormalized = filter.toLowerCase();
  return contacts.filter(
    contact =>
      contact.name && contact.name.toLowerCase().includes(filterNormalized)
  );
};

  const filteredContacts = getFilteredContacts();

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <>
      <VStack spacing={8} mt={4} align="stretch">
        {filteredContacts.map(contact => (
          <Box key={contact.id} display="flex" alignItems="center">
            <p>
              {contact.name}: {contact.number}
            </p>
             <Box flex="1" />
            <Button
              onClick={() => handleDeleteContact(contact.id)}
              ml={6} 
            >
              X
            </Button>
          </Box>
        ))}
      </VStack>
    </>
  );
}
export default ContactBook;
