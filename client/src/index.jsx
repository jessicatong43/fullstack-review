import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  const search = (term) => {
    Axios.post('/repos', {
      username: `${term}`
    })
    .then(() => {
      return axios.get('/repos')
    })
    .then((repoData) => {
      setRepos(repoData)
    })
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));