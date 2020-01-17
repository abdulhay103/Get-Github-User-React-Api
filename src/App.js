import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Layout/Navbar';
import Users from './components/User/Users';
import User from './components/User/User';
import Search from './components/User/Search';
import Alert from './components/Layout/Alert';
import About from './components/Pages/About';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState([]);

  useEffect(() => {
    const getDidMount = async () => {
      setLoading(true);
      const show = await axios.get(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUsers(show.data);
      setLoading(false);
    };
    getDidMount();
    // eslint-disable-next-line
  }, []);

  // Search Github Users
  const SearchGitUsers = async text => {
    setLoading(true);
    const show = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(show.data.items);
    setLoading(false);
  };

  // Get Single Github User
  const getSingleUser = async username => {
    setLoading(true);
    const show = await axios.get(
      `https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(show.data);
    setLoading(false);
  };

  // Get Single Github User Repos
  const getSingleUserRepos = async username => {
    setLoading(true);

    const show = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(show.data);
    setLoading(false);
  };

  // Claer All Users
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  //Set Alert Function
  const setAlertFun = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container mt-2'>
          <Alert alertProps={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={SearchGitUsers}
                    clearUsers={clearUsers}
                    showClearBtn={users.length > 0 ? true : false}
                    setAlert={setAlertFun}
                  />
                  <Users propsUsers={users} propsLoading={loading} />
                </Fragment>
              )}
            />
            <Route exact path='/About' component={About} />
            <Route
              exact
              path='/User/:login'
              render={props => (
                <User
                  {...props}
                  getSingleUser={getSingleUser}
                  singleUser={user}
                  getSingleUserRepos={getSingleUserRepos}
                  userRepos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
