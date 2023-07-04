import { Container, Header } from "components/App.styled";
import ContactBook from "components/ContactBook/ContactBook";
import ContactForm from "components/ContactForm/ContactForm";
import Filter from "components/FilterContactBook/FilterContactBook";


const Contacts = () => {
  return (
    <>
      <Container>
        <Header>Phonebook</Header>
        <ContactForm />
        <Header>Contacts</Header>
        <Filter />
        <ContactBook />
      </Container>
    </>
  );
};

export default Contacts;
