import React from 'react';
import { ContactList, ContactItem, DeleteButton } from './ContactBook.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'store/thunk';

function ContactBook() {
  const contacts = useSelector(state => state.contacts.contacts.items);
  console.log('contacts', contacts)
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const getFilteredContacts = () => {
    const filterNormalized = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormalized)
    );
  };

  const filteredContacts = getFilteredContacts();

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <>
      <ContactList>
        {filteredContacts.map(contact => (
          <ContactItem key={contact.id}>
            <p>
              {contact.name}: {contact.number}
            </p>
            <DeleteButton onClick={() => handleDeleteContact(contact.id)}>
              X
            </DeleteButton>
          </ContactItem>
        ))}
      </ContactList>
    </>
  );
}
export default ContactBook;
