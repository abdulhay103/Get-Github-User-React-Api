import React, { Fragment, useEffect } from 'react';
import Spinner from '../Layout/Spinner';
import Repos from '../Repos/Repos';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const User = props => {
  useEffect(() => {
    // console.log(props);
    props.getSingleUser(props.match.params.login);
    props.getSingleUserRepos(props.match.params.login);
  }, []);

  User.propTypes = {
    loading: PropTypes.bool,
    singleUser: PropTypes.object.isRequired,
    getSingleUser: PropTypes.func.isRequired,
    getSingleUserRepos: PropTypes.func.isRequired,
    userRepos: PropTypes.array.isRequired
  };

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = props.singleUser;

  const { loading, userRepos } = props;
  //console.log(hireable);

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back To Search
      </Link>
      Hireable:{''}
      {hireable ? (
        <i className='fas fa-check text-success px-2' />
      ) : (
        <i className='fas fa-times-circle text-danger px-2' />
      )}
      <div className='card'>
        <div className='row'>
          <div className='col-md-4 text-center'>
            <img
              className='card-img-top img-fluid'
              src={avatar_url}
              alt='Card image'
              style={{ width: '80%', height: '180px' }}
            />
            <h5 className='card-title pt-3'>{name}</h5>
            <p className='card-text'>{location}</p>
          </div>
          <div className='col-md-8'>
            {bio && (
              <Fragment>
                <h3>Bio:</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className='btn btn-dark my-2'>
              Visit Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>User Name:</strong> {login}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company:</strong> {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Website: </strong> {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='border border-rounded p-3'>
        <button type='button' className='btn btn-primary'>
          Followers: <span className='badge badge-light'>{followers}</span>
        </button>
        <button type='button' className='btn btn-success'>
          Following: <span className='badge badge-light'>{following}</span>
        </button>
        <button type='button' className='btn btn-danger'>
          Public Repos:{' '}
          <span className='badge badge-light'>{public_repos}</span>
        </button>
        <button type='button' className='btn btn-warning'>
          Public Gists:{' '}
          <span className='badge badge-light'>{public_gists}</span>
        </button>
      </div>
      <Repos userRepos={userRepos} />
    </Fragment>
  );
};
export default User;
