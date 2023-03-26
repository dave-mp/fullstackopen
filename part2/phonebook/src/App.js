import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");

  const handleNameChange = ({ target: { value } }) => setNewName(value);
  const handleNumberChange = ({ target: { value } }) => setNewNumber(value);
  const handleFilterTextChange = ({ target: { value } }) =>
    setFilterText(value);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((p) => p.name.toLowerCase() === newName.trim())) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName.trim(), number: newNumber }));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        filterText={filterText}
        handleFilterTextChange={handleFilterTextChange}
      />

      <h2>Add new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} filterText={filterText} />
    </div>
  );
};

export default App;
