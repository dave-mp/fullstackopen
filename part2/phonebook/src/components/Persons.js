const Persons = ({ persons, filterText }) => {
  return (
    <ul>
      {persons
        .filter(
          (p) =>
            filterText === "" ||
            p.name.toLowerCase().includes(filterText.toLowerCase()) ||
            p.number.toLowerCase().includes(filterText.toLowerCase())
        )
        .map(({ name, number }) => {
          return (
            <li key={name}>
              {name}: {number}
            </li>
          );
        })}
    </ul>
  );
};

export default Persons;
