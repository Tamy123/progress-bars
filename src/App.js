import React, { useState, useEffect, useRef } from "react";
import Progress from "react-progressbar";
import { Line } from "rc-progress";
import "rc-progress/assets/index.css";
import "./App.css";

function App() {
  const buttons = [22, 14, -24, -18];
  const bars = [12, 11, 60, 11];
  const [myBar, setMyBar] = useState([
    { bar: 12, color: "blue" },
    { bar: 11, color: "blue" },
    { bar: 60, color: "blue" },
    { bar: 11, color: "blue" }
  ]);
  const [percent, setPercent] = useState(10);

  const [color, setColor] = useState("blue");
  const [progressBar, setProgressBar] = useState(0);
  const barRef = useRef(null);
  // const [value, setValue] = useState(10);

  const barDependency = myBar[progressBar].bar;

  useEffect(() => {
    if (myBar[progressBar].bar > 100) {
      // debugger
      let newArr = [...myBar];
      newArr[progressBar].color = "red";
      setMyBar(newArr);
    } else {
      let newArr = [...myBar];
      newArr[progressBar].color = "blue";
      setMyBar(newArr);
      // setColor("blue");
    }
  }, [barDependency]);

  const containerStyle = {
    width: "250px"
  };

  const baseLimit = 0;
  const limit = 150;

  const handleState = value => {
    const res = Math.sign(value);
    res === 1 ? incrementState(value) : decrementState(value);
  };

  const incrementState = value => {
    // const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];
    // const value = parseInt(Math.random() * 100, 10);
    if (myBar[progressBar].bar + value < limit) {
      let newArr = [...myBar];
      newArr[progressBar].bar = myBar[progressBar].bar + value;
      setMyBar(newArr);

    } else if (myBar[progressBar].bar + value > limit) {
      let newArr = [...myBar];
      newArr[progressBar].bar = limit;
      setMyBar(newArr);
    }
    // percent < limit && setPercent(percent + value);
    // percent > 100 ? setColor('red') : setColor('blue');
  };

  const decrementState = value => {
    if (myBar[progressBar].bar + value > baseLimit) {
      let newArr = [...myBar];
      newArr[progressBar].bar = myBar[progressBar].bar + value;
      setMyBar(newArr);
      // setPercent(percent + value);
    } else if (myBar[progressBar].bar + value < baseLimit) {
      let newArr = [...myBar];
      newArr[progressBar].bar = baseLimit;
      setMyBar(newArr);
      //  setPercent(baseLimit);
    }
    // const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];
    // const value = parseInt(Math.random() * 100, 10);
    // percent > baseLimit && setPercent(percent + value);
    // percent > 100 ? setColor('red') : setColor('blue');
  };

  // const buttons = [22, 14, -24, -18];
  // const bars = [12, 11, 60, 11];

  return (
    <div className="App">
      <div style={containerStyle}>
        {bars.map((bar, index) => {
          return (
            <div>
              <h3>Line Progress {myBar[index].bar}%</h3>
              <Line
                key={index}
                percent={myBar[index].bar}
                strokeWidth="4"
                strokeColor={myBar[index].color}
              />
            </div>
          );
        })}
      </div>
      {/* <Progress completed={counter} color="red"/>
      {counter}
      <br/>
      <button onClick={() => setCounter(80)}>Increment Counter</button> */}
      <select
        id="bars"
        ref={barRef}
        onChange={e => setProgressBar(e.target.value)}
      >
        {bars.map((item, index) => (
          <option value={index}>progress bar #{index + 1}</option>
        ))}
      </select>

      {buttons.map(button => {
        return (
          <button type="button" onClick={() => handleState(button)}>
            {button > 0 ? `+${button}` : button}
          </button>
        );
      })}
      {/* <p>
        <button type="button" onClick={incrementState}>
          Increment State by {value}%
        </button>
      </p>
      <p>
        <button type="button" onClick={decrementState}>
          Decrement State by {value}%
        </button>
      </p> */}
    </div>
  );
}

export default App;
