import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = props => {
  const [state, setState] = useState({
    text: ''
  });

  const onChangeHandler = e => {
    setState({ [e.target.name]: e.target.value });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    if (state.text === '') {
      props.setAlert('Please enter somethings!', 'danger');
    } else {
      props.searchUsers(state.text);
      setState({ text: '' });
    }
  };

  const clearUserHandaler = e => {
    props.clearUsers(e);
  };

  Search.propsTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClearBtn: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
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
          value={state.text}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {props.showClearBtn && (
        <button onClick={clearUserHandaler} className='btn btn-light btn-block'>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
