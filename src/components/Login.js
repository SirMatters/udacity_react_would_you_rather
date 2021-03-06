import React from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../actions/authedUser';

class Login extends React.Component {
  state = {
    uid: '',
  };

  onChange = (e) => {
    this.setState({ uid: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { dispatch, users } = this.props;
    const { uid } = this.state;
    console.log(uid, Object.keys(users));
    if (Object.keys(users).includes(uid)) {
      dispatch(authenticateUser(uid));
      this.setState({ uid: '' });
    } else {
      alert('No such user, try again');
    }
  };
  render() {
    const { users = {} } = this.props;
    return (
      <div className='login'>
        <form
          className='rounded border border-light col-md-6 text-center pt-3'
          onSubmit={this.onSubmit}
        >
          <div className='text-center mb-4'>
            <span className='brand'>
              <p>W</p>
            </span>
            <h1>Would you rather</h1>
          </div>
          <div className='form-group'>
            <select
              value={this.state.uid}
              className='form-control'
              onChange={this.onChange}
            >
              <option value='' disabled></option>
              {Object.keys(users).map((u) => (
                <option key={u} value={u}>
                  {users[u].name}
                </option>
              ))}
            </select>
          </div>
          <button
            disabled={this.state.uid === ''}
            className='btn btn-light btn-block'
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps)(Login);
