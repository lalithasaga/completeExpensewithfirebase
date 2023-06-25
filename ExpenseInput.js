import React, { useState } from 'react';

const ExpenseInput = ({ id, label, type, required, inputRef }) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="form-group">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        className="input"
        type={type}
        id={id}
        required={required}
        value={value}
        onChange={handleChange}
        ref={inputRef}
      />
    </div>
  );
};

export default ExpenseInput;
