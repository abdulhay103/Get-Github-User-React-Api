import React from 'react';
import ReposItem from './ReposItem';
import PropTypes from 'prop-types';

const Repos = ({ userRepos }) => {
  // console.log(userRepos);

  return userRepos.map(userRepo => (
    <ReposItem userRepo={userRepo} key={userRepo.id} />
  ));
};

Repos.propTypes = {
  userRepos: PropTypes.array.isRequired
};

export default Repos;
