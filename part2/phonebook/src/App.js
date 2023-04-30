import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    personsService.getAll().then(({ data }) => {
      setPersons(data);
    });
  }, []);

  const handleNameChange = ({ target: { value } }) => setNewName(value);
  const handleNumberChange = ({ target: { value } }) => setNewNumber(value);
  const handleFilterTextChange = ({ target: { value } }) =>
    setFilterText(value);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.trim().toLowerCase()
    );
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .update(existingPerson.id, {
            name: newName.trim(),
            number: newNumber,
          })
          .then(({ data }) => {
            setPersons(persons.map((p) => (data.id === p.id ? data : p)));
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      personsService
        .create({ name: newName.trim(), number: newNumber })
        .then(({ data }) => {
          setPersons(persons.concat(data));
          setNewName("");
          setNewNumber("");
        });
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
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

      <Persons
        persons={persons}
        filterText={filterText}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
