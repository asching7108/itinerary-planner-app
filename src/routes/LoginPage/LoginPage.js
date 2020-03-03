import React, { Component } from 'react';
import TripListContext from '../../context/TripListContext';
import LoginForm from '../../components/LoginForm/LoginForm';
import { ButtonLikeLink } from '../../components/Utils/Utils';
import './LoginPage.css';

export default class LoginPage extends Component {
	static contextType = TripListContext;

	static defaultProps = {
		location: {},
		history: {
			push: () => {},
		},
		onAuthStateChange: () => {}
	}

	handleLoginSuccess = () => {
		const { location, history } = this.props;
		const dest = (location.state || {}).from || '/';
		this.context.setAuthState(true);
		history.push(dest);
	}

	handleClickOnCancel = () => {
		this.props.history.goBack();
	}
	
	render() {
		return (
			<section className='LoginPage'>
				<h2>Login</h2>
				<LoginForm
					onLoginSuccess={this.handleLoginSuccess}
					onClickOnCancel={this.handleClickOnCancel}
				/>
				<p className='LoginPage__text'>Doesn't have an account?</p>
				<ButtonLikeLink to='/signup' className='LoginPage__sign-up'>
					Sign up
				</ButtonLikeLink>
			</section>
		);
	}
}