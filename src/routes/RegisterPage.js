import React, { Component } from 'react';
import TripListContext from '../context/TripListContext';
import RegisterForm from '../components/RegisterForm/RegisterForm';

export default class RegisterPage extends Component {
	static contextType = TripListContext;

	handleRegisterSuccess = () => {
		this.context.setAuthState(true);
		this.props.history.push('/');
	}

	handleClickOnCancel = () => {
		this.props.history.push('/');
	}

	render() {
		return (
			<section className='RegisterPage'>
				<h2>Create an account</h2>
				<RegisterForm
					onRegisterSuccess={this.handleRegisterSuccess}
					onClickOnCancel={this.handleClickOnCancel}
				/>
			</section>
		);
	}
}