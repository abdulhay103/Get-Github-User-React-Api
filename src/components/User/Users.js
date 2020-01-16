import React from 'react';
import UserItem from './UserItem';
import Spinner from '../Layout/Spinner';
import PropTypes from 'prop-types';

const Users = ({ propsUsers, propsLoading }) => {
  if (propsLoading) {
    return <Spinner />;
  } else {
    return (
      <div className='row'>
        {propsUsers.map(user => (
          <UserItem key={user.id} propsUser={user} />
        ))}
      </div>
    );
  }
};
Users.propTypes = {
  propsUsers: PropTypes.array.isRequired,
  propsLoading: PropTypes.bool.isRequired
};

export default Users;
