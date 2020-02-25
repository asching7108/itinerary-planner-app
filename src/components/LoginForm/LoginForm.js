import React, { Component } from 'react';
import { Button, Input, ButtonBox } from '../Utils/Utils';
import './LoginForm.css';

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
    onClickOnCancel: () => {}
  }

  state = { error: null }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });
    const { email, password } = e.target;

    email.value = '';
    password.value='';
    this.props.onLoginSuccess();
  }

  render() {
    const { error } = this.state;
    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div>
          <label htmlFor='LoginForm__email'>
            Email
          </label>
          <Input
            name='email'
            type='email'
            id='LoginForm__email'
            required
          />
        </div>
        <div>
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <Input
            name='password'
            type='password'
            id='LoginForm__password'
            required
          />
        </div>
        <ButtonBox>
          <Button type='button' onClick={this.props.onClickOnCancel}>
            Cancel
          </Button>
          <Button type='submit'>
            Sign in
          </Button>
        </ButtonBox>
      </form>
    );
  }
}