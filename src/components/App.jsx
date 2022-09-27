import { useState, useEffect } from 'react';
import  ContactForm  from './formInput/formInput';
import ContactList from './contactsList/ContactList';
import FilterForm from './filterForm/FilterForm';
import { nanoid } from 'nanoid';
import { GlobalStyle } from 'utils/GlobalStyle';
import { Wrapper } from './App.module';


const useLocalStorage = (key, defaultValue) => {
  const [state, setState]= useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  })
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  
  return [state, setState];
  };




const App = () =>  {

  const [contacts, setContacts] = useLocalStorage('contacts', [])
  const [filter, setFilter] = useState('')








  const addUser = (name, number) => {
    const nameNormalize = name.toLowerCase().trim();
    const ifExist = contacts.find(
      ({ name }) => nameNormalize === name
    );
    if (ifExist) {
      return alert(`${name} already in your phone book`);
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

   setContacts(prevContacts => [...prevContacts, contact])
  };

  const filterChange = e => {
    setFilter(e.target.value)

  }

 const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState => 
    prevState.filter(contact => contact.id !== contactId))
    
    // const deleteById = e.target.value;
    //   const newArr = contacts.filter(contact => contact.id !== deleteById);
    //   return { contacts: newArr };
  }


    const filteredContacts = getFilteredContacts();
    return (
      <Wrapper>
        <h2>Phone book</h2>
        <ContactForm onSubmit={addUser} />
        <h2>Contacts</h2>
        <FilterForm filteredValue={filter} onSearch={filterChange} />
        {filteredContacts.length > 0 ? (
          <ContactList
            data={filteredContacts}
            deleteContact={deleteContact}
          />
        ) : (
          <p>Contacts not founded</p>
        )}{' '}
        <GlobalStyle />
      </Wrapper>
    );
}


export default App