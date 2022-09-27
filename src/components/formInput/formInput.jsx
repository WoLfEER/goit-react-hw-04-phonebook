
import { useState } from 'react';
import { nanoid } from 'nanoid';
import {
  Label,
  Form,
  Input,
  Button,
} from 'components/formInput/formInput.module';

const ContactForm = ({onSubmit}) => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

 const nameId = nanoid();
 const numberId = nanoid(); 

  const handleChange = e => {
    const {name, value} = e.target

    switch (name) {
      case 'name':
        setName(value)
        break;
      case 'number':
        setNumber(value);
        break
      default:
        break;
    }
  }


const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name, number);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

    return (
      <Form onSubmit={handleSubmit}>
        <Label htmlFor={nameId}>Name</Label>
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />

        <Label htmlFor={numberId}>Number</Label>
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
        <Button type="submit">Add user</Button>
      </Form>
    );
  }


export default ContactForm