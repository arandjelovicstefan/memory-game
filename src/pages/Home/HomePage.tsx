import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setCurrentUser } from '../../redux/user/user.actions';
import './HomePage.styles.css';

const Home: React.FC = (props: any) => {
  const [username, setUsername] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username.trim() === '') {
      setErr('Enter a valid username!');
      return;
    }
    props.setCurrentUser(username);
    setErr('');
    setUsername('');
  };

  return (
    <div>
      <h2>Memory game</h2>
      <form onSubmit={handleSubmit}>
        <input
          className='input'
          type='text'
          placeholder='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <p className='error'> {err ? err : null} </p>
        <button type='submit'>Start Game</button>
      </form>
      {props.currentUser ? <Redirect to='/game' /> : null}
    </div>
  );
};

const mapStateToProps = (state: { user: { currentUser: any } }) => {
  return {
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCurrentUser: (user: any) => dispatch(setCurrentUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
