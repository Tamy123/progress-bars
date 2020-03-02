import React from 'react';
import PropTypes from 'prop-types';

const Button = ({result, handleState}) => {
  return (
    <>
      {result.buttons &&
        result.buttons.map((button, index) => (
          <button key={index} type="button" onClick={() => handleState(button)}>
            {button > 0 ? `+${button}` : button}
          </button>
        ))}
    </>
  );
}

Button.propTypes = {
  result: PropTypes.object,
  handleState: PropTypes.func
};

export default Button
