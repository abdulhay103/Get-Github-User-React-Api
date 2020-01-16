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

function App() {
  const [state, setState] = useState({
    users: [],
    user: {},
    repos: [],
    loading: true,
    alert: null
  });

  // Destructer State
  const { users, user, repos, loading, alert } = state;

  useEffect(() => {
    const getDidMount = async () => {
      const show = await axios.get(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setState({ ...state, users: show.data, loading: false });
    };
    getDidMount();
  }, []);
  // console.log(repos);

  // Search Github Users
  const SearchGitUsers = async text => {
    setState({ ...state, loading: true });
    const show = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setState({ ...state, users: show.data.items, loading: false });
    // console.log(show);
  };

  // Get Single Github User
  const getSingleUser = async username => {
    setState({ ...state, loading: true });
    const show = await axios.get(
      `https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(show.data);

    setState({ ...state, user: show.data, loading: false });
  };

  // Get Single Github User Repos
  const getSingleUserRepos = async username => {
    setState({ ...state, loading: true });
    const show = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=7&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setState({ ...state, repos: show.data, loading: false });
  };

  // Claer All Users
  const clearUsers = () => {
    setState({ ...state, users: [], loading: false });
  };

  //Set Alert Function
  const setAlertFun = (msg, type) => {
    setState({ ...state, alert: { msg, type } });
    setTimeout(() => setState({ ...state, alert: null }), 5000);
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
}

export default App;
