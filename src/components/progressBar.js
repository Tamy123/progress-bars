import React from 'react';
import { Line } from 'rc-progress';
import 'rc-progress/assets/index.css';
import PropTypes from 'prop-types';

const ProgressBar = ({ bars }) => {
  return (
    <>
      {bars.map((bar, index) => {
        return (
          <div key={index}>
            <h3>Line Progress {bar.bar}%</h3>
            <Line
              key={index}
              percent={bar.bar}
              strokeWidth="4"
              strokeColor={bar.color}
            />
          </div>
        );
      })}
    </>
  );
};

ProgressBar.propTypes = {
  bars: PropTypes.array,
};

export default ProgressBar;
