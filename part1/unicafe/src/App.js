import { useState } from "react";

const StatisticLine = ({ name, value }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const statistics = [
    { name: "Good", value: good },
    { name: "Neutral", value: neutral },
    { name: "Bad", value: bad },
    { name: "All", value: good + neutral + bad },
    { name: "Average", value: (good + -1 * bad) / (good + neutral + bad) },
    { name: "Positive", value: `${(good / (good + neutral + bad)) * 100}%` },
  ];

  return (
    <div>
      <h2>Statistics</h2>
      {good || neutral || bad ? (
        <div>
          <table>
            <tbody>
              {statistics.map(({ name, value }, index) => {
                return <StatisticLine name={name} value={value} key={index} />;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>Give feedback</h2>
      <div>
        <Button handleClick={() => setGood(good + 1)} text={"Good"} />
        <Button handleClick={() => setNeutral(neutral + 1)} text={"Neutral"} />
        <Button handleClick={() => setBad(bad + 1)} text={"Bad"} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
