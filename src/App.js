import React from "react";
import { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
import Container from "./Components/Container";
import ContactForm from "./Components/ContactForm/ContactForm";
import shortid from "shortid";
import ContactList from "./Components/ContactList/ContactList";
import Filter from "./Components/Filter/Filter";

export default function App() {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  const addContact = (name, number) => {
    const findName = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (findName) {
      alert(`${name} is already in contacts!`);
      return;
    }

    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };
    setContacts((prevState) => [newContact, ...prevState]);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    const filteredContact = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return filteredContact;
  };

  const changeFilter = (e) => {
    setFilter({ filter: e.currentTarget.value });
  };

  const deleteContacts = (contactId) => {
    setContacts((state) => state.filter(({ id }) => id !== contactId));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h1>Contacts</h1>
      <Filter value={filter} onFilter={changeFilter} />
      <ContactList contacts={getVisibleContacts()} onClick={deleteContacts} />
    </Container>
  );
}
