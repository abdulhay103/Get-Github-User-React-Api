import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ props, setAlert, searchUsers, clearUsers, showClearBtn }) => {
  const [text, setText] = useState('');

  const onChangeHandler = e => {
    setText(e.target.value);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please enter somethings!', 'danger');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  const clearUserHandaler = e => {
    clearUsers(e);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='form-group'>
        <input
          onChange={onChangeHandler}
          type='text'
          className='form-control mb-2'
          name='text'
          placeholder='Search users...'
          value={text}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {showClearBtn && (
        <button onClick={clearUserHandaler} className='btn btn-light btn-block'>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propsTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClearBtn: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default Search;
