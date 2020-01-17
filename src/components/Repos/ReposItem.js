import React from 'react';
import PropTypes from 'prop-types';

const ReposItem = ({ userRepo }) => {
  console.log(userRepo);
  return (
    <div className='card'>
      <h4>
        <a href={userRepo.html_url}>{userRepo.name}</a>
      </h4>
    </div>
  );
};

ReposItem.propTypes = {
  userRepo: PropTypes.object.isRequired
};

export default ReposItem;
