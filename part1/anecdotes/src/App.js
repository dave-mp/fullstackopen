import { useState } from "react";

const Anecdote = ({ value: { text, score } }) => {
  return (
    <>
      <p>{text}</p>
      <p>Has {score} votes</p>
    </>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { text: "If it hurts, do it more often.", score: 0 },
    {
      text: "Adding manpower to a late software project makes it later!",
      score: 0,
    },
    {
      text: "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      score: 0,
    },
    {
      text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      score: 0,
    },
    { text: "Premature optimization is the root of all evil.", score: 0 },
    {
      text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      score: 0,
    },
    {
      text: "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      score: 0,
    },
    { text: "The only way to go fast, is to go well.", score: 0 },
  ]);

  const [selected, setSelected] = useState(0);

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length - 1)));
  };

  const handleVote = () => {
    const copyAnecdotes = [...anecdotes];
    copyAnecdotes[selected] = {
      ...copyAnecdotes[selected],
      score: copyAnecdotes[selected].score + 1,
    };
    setAnecdotes(copyAnecdotes);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote value={anecdotes[selected]} />
      <div>
        <button onClick={handleVote}>Vote</button>
        <button onClick={handleNext}>Next anecdote</button>
      </div>

      <h2>Anecdote(s) with most votes</h2>
      {anecdotes
        .filter((a) => a.score === Math.max(...anecdotes.map((a) => a.score)))
        .map((a, index) => {
          return <Anecdote value={a} key={index} />;
        })}
    </div>
  );
};

export default App;
