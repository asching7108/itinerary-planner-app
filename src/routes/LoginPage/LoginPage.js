import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import { ButtonLikeLink } from '../../components/Utils/Utils';
import './LoginPage.css';

export default class LoginPage extends Component {
	static defaultProps = {
		location: {},
		history: {
			push: () => {},
		},
	}

	handleLoginSuccess = () => {
		const { location, history } = this.props;
		const dest = (location.state || {}).from || '/';
		history.push(dest);
	}
	
  render() {
    return (
			<section className='LoginPage'>
				<h2>Login</h2>
				<LoginForm
					onLoginSuccess={this.handleLoginSuccess}
				/>
				<p className='LoginPage__text'>Doesn't have an account?</p>
				<ButtonLikeLink to='/signup' className='LoginPage__sign-up'>
					Sign up
				</ButtonLikeLink>
			</section>
		);
  }
}