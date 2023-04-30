const Persons = ({ persons, filterText, deletePerson }) => {
  return (
    <ul>
      {persons
        .filter(
          (p) =>
            filterText === "" ||
            p.name.toLowerCase().includes(filterText.toLowerCase()) ||
            p.number.toLowerCase().includes(filterText.toLowerCase())
        )
        .map((person) => {
          return (
            <li key={person.name}>
              {person.name}: {person.number}{" "}
              <button onClick={() => deletePerson(person)}>delete</button>
            </li>
          );
        })}
    </ul>
  );
};

export default Persons;
