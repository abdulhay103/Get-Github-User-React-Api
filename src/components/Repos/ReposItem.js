import React from 'react';
import PropTypes from 'prop-types';

const ReposItem = ({ userRepo }) => {
  return (
    <div className='card'>
      <h3>
        <a href={userRepo.html_url}>{userRepo.name}</a>
      </h3>
    </div>
  );
};

ReposItem.propTypes = {
  userRepo: PropTypes.object.isRequired
};

export default ReposItem;
