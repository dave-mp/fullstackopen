import { useState, useEffect } from "react";
import "./index.css";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [message, setMessage] = useState({ text: null, type: "" });

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
            setMessage({
              text: `Updated ${newName}`,
              type: "success",
            });
            setTimeout(() => {
              setMessage({ text: null, type: "" });
            }, 5000);
          })
          .catch(() => {
            setMessage({
              text: `${newName} was already removed from server`,
              type: "error",
            });
            setTimeout(() => {
              setMessage({ text: null, type: "" });
              setPersons(persons.filter((p) => existingPerson.id !== p.id));
            }, 5000);
          });
      }
    } else {
      personsService
        .create({ name: newName.trim(), number: newNumber })
        .then(({ data }) => {
          setPersons(persons.concat(data));
          setNewName("");
          setNewNumber("");
          setMessage({
            text: `Added ${newName}`,
            type: "success",
          });
          setTimeout(() => {
            setMessage({ text: null, type: "" });
          }, 5000);
        });
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
          setMessage({
            text: `Removed ${person.name}`,
            type: "success",
          });
          setTimeout(() => {
            setMessage({ text: null, type: "" });
          }, 5000);
        })
        .catch(() => {
          setMessage({
            text: `${person.name} was already removed from server`,
            type: "error",
          });
          setTimeout(() => {
            setMessage({ text: null, type: "" });
            setPersons(persons.filter((p) => p.id !== person.id));
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

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
