import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './common';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';

const LS_Data = localStorage.getItem('contacts') ?? "[]";

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setContacts(JSON.parse(LS_Data));
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (!duplicationCheck(name)) {
      const id = nanoid(4);
      setContacts(prevState => [...prevState, { id, name, number }]);
    }
  };

  const deleteContact = id => {
    setContacts(prevState => [...prevState.filter(item => item.id !== id)]);
  };

  const duplicationCheck = checkName => {
    const isDuplicate = false;
    if (contacts.length > 0) {
      const name = Boolean(contacts.find(item => item.name === checkName));
      if (name) {
        alert(`${checkName} is already in contacts.`);
        return !isDuplicate;
      }
    }
    return isDuplicate;
  };

  const filterContacts = e => {
    const value = e.currentTarget.value;
    setFilter(value);
  };

  const filteredContacts = contacts.filter(item => item.name.includes(filter));

  return (
    <>
      <Section title="Phonebook">
        <ContactForm addContact={addContact} />
      </Section>
      {contacts.length > 0 && (
        <Section title="Contacts">
          <Filter onChange={filterContacts} value={filter} />
          <ContactList
            contacts={filteredContacts}
            deleteContact={deleteContact}
          />
        </Section>
      )}
    </>
  );
};
