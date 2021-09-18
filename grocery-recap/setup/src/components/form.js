import React from 'react';
import Alert from '../pages/Alert';
import {useFormContext, useGlobalContext} from './context';

const Form = () => {
  const {handleSubmit, handleChange, query} = useFormContext();
  const {alert} = useGlobalContext();

  return (
    <div>
      <h1>grocery bud</h1>
      {alert.show && <Alert alert={alert} />}
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          placeholder="write a list to buy"
          type="text"
          value={query}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Form;
