import React, { useState, useEffect } from 'react';
import ProgressBar from './components/progressBar';
import Dropdown from './components/dropdown';
import Button from './components/button';
import httpService from './utils/http.service';
import './App.css';

function App() {
  const [progressBar, setProgressBar] = useState(0);
  const [result, setResult] = useState({});
  const [bars, setBars] = useState([]);
  const [limit, setLimit] = useState('');

  const baseLimit = 0;
  const barDependency = bars[progressBar] && bars[progressBar].bar;

  useEffect(() => {
    setBars(bars => {
      let copyArr = [...bars];
      result.bars &&
        result.bars.forEach((bar, index) => {
          return (copyArr[index] = { bar: bar, color: 'blue' });
        });
      return copyArr;
    });
  }, [result]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        httpService.init();
        const res = await httpService.get();
        setResult(res.data);
        setLimit(res.data.limit);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (bars.length !== 0) {
      if (bars[progressBar].bar > 100) {
        updateArray('color', null, null, 'red');
      } else {
        updateArray('color', null, null, 'blue');
      }
    }
  }, [barDependency]);

  const containerStyle = {
    width: '250px'
  };

  const updateArray = (key, value, limit, color) => {
    const newArr = [...bars];
    if (value) {
      newArr[progressBar][key] = newArr[progressBar][key] + value;
      setBars(newArr);
    } else if (limit || limit === 0) {
      newArr[progressBar][key] = limit;
      setBars(newArr);
    } else if (color) {
      newArr[progressBar][key] = color;
      setBars(newArr);
    }
  };

  const handleState = value => {
    const res = Math.sign(value);
    res === 1 ? incrementState(value) : decrementState(value);
  };

  const incrementState = value => {
    if (bars[progressBar].bar + value < limit) {
      updateArray('bar', value);
    } else if (bars[progressBar].bar + value >= limit) {
      updateArray('bar', null, limit);
    }
  };

  const decrementState = value => {
    if (bars[progressBar].bar + value > baseLimit) {
      updateArray('bar', value);
    } else if (bars[progressBar].bar + value <= baseLimit) {
      updateArray('bar', null, baseLimit);
    }
  };

  return (
    <div className="flex-box">
      <div className="App">
        <div style={containerStyle}>
          {bars.length !== 0 ? (
            <ProgressBar bars={bars} />
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        {bars.length !== 0 && (
          <Dropdown result={result} setProgressBar={setProgressBar} />
        )}
        <Button result={result} handleState={handleState} />
      </div>
    </div>
  );
}

export default App;
