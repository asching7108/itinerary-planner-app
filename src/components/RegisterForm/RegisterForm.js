import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import { Button, Input, Required, ButtonBox } from '../Utils/Utils';

export default class RegisterForm extends Component {
	static defaultProps = {
		onRegisterSuccess: () => {},
		onClickOnCancel: () => {}
	};

	state = { error: null };

	handleSubmit = e => {
		e.preventDefault();
		this.setState({ error: null });
		const { email, user_name, password, cf_password } = e.target;

		if (password.value !== cf_password.value) {
			this.setState({ error: 'The password and confirmation password do not match' });
			return;
		}

		AuthApiService.postUser({
			email: email.value,
			password: password.value,
			user_name: user_name.value
		})
			.then(res => {
				AuthApiService.postLogin({
					email: email.value,
					password: password.value
				})
			})
			.then(res => {
				email.value = '';
				password.value = '';
				cf_password.value='';
				user_name.value = '';
				this.props.onRegisterSuccess();
			})
			.catch(res => {
				this.setState({ error: res.error });
			});
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
					<label htmlFor='RegisterForm__user_name'>
						Your name <Required />
					</label>
					<Input
						name='user_name'
						type='text'
						id='RegisterForm__user_name'
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
