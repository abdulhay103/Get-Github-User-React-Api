import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserItem = ({ propsUser: { login, id, avatar_url } }) => {
  return (
    <div className='col-xsm-12 col-sm-6 col-md-4 col-lg-3'>
      <div className='card text-center'>
        <img
          src={avatar_url}
          alt='User Img'
          className='card-img-top'
          style={{ width: '100%', height: '200px' }}
        />
        <div className='card-body'>
          <h4 className='card-title'>{login}</h4>
          <p className='card-text'>User Id Is: {id}</p>
          <Link to={`/user/${login}`} className='btn btn-primary btn-block'>
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  propsUser: PropTypes.object.isRequired
};
export default UserItem;
