import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser, setTurns } from '../../redux/user/user.actions';
import './Scoreboard.styles.css';

const Scoreboard: React.FC = (props: any) => {
  return (
    <div>
      <h2>Scoreboard</h2>
      <div className='score'>
        <span>Username</span>
        <span>Finished after</span>
      </div>
      <div className='score'>
        <span>{props.currentUser}</span>
        <span>{props.turns} turns</span>
      </div>
      <button
        onClick={() => {
          props.setCurrentUser('');
          props.setTurns(0);
          props.history.push({ pathname: '/' });
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    turns: state.user.turns,
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCurrentUser: (user: any) => dispatch(setCurrentUser(user)),
    setTurns: (turns: any) => dispatch(setTurns(turns)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);
