import React from 'react'
import PropTypes from 'prop-types';

const Dropdown = ({result, setProgressBar}) => {
  return (
    <>
      <select id="bars" onChange={e => setProgressBar(e.target.value)}>
        {result.bars &&
          result.bars.map((item, index) => (
            <option key={index} value={index}>
              progress bar #{index + 1}
            </option>
          ))}
      </select>
    </>
  );
}

Dropdown.propTypes = {
  result: PropTypes.object,
  setProgressBar: PropTypes.func,
};

export default Dropdown
