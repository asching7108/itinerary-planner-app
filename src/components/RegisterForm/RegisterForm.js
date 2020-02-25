import React, { Component } from 'react';
import { Button, Input, Required, ButtonBox } from '../Utils/Utils';

export default class RegisterForm extends Component {
  static defaultProps = {
    onRegisterSuccess: () => {},
    onClickOnCancel: () => {}
  }

  state = { error: null }

  handleSubmit = e => {
    e.preventDefault();
    const { email, user_name, password, cf_password } = e.target;

    this.setState({ error: null });

    email.value='';
    user_name.value='';
    password.value='';
    cf_password.value='';
    this.props.onRegisterSuccess();
  }

  render() {
    const { error } = this.state;
    return (
      <form
        className='RegisterForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div>
          <label htmlFor='RegisterForm__email'>
            Email <Required />
          </label>
          <Input
            name='email'
            type='email'
            id='RegisterForm__email'
            required
          />
        </div>
        <div>
          <label htmlFor='RegisterForm__password'>
            Password <Required />
          </label>
          <Input
            name='password'
            type='password'
            id='RegisterForm__password'
            required
          />
        </div>
        <div>
          <label htmlFor='RegisterForm__cf_password'>
            Confirm password <Required />
          </label>
          <Input
            name='cf_password'
            type='password'
            id='RegisterForm__cf_password'
            required
          />
        </div>
        <div>
          <label htmlFor='RegisterForm__your_name'>
            Your name <Required />
          </label>
          <Input
            name='your_name'
            type='text'
            id='RegisterForm__your_name'
            required
          />
        </div>
        <ButtonBox>
          <Button type='button' onClick={this.props.onClickOnCancel}>
            Cancel
          </Button>
          <Button type='submit'>
            Create acount
          </Button>
        </ButtonBox>
      </form>
    );
  }
}
