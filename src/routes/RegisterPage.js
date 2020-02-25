import React, { Component } from 'react';
import RegisterForm from '../components/RegisterForm/RegisterForm';

export default class RegisterPage extends Component {
	static defaultProps = {
		history: {
			push: () => {},
		}
	}

	handleRegisterSuccess = () => {
		const { history } = this.props;
		history.push('/login');
	}

	handleClickOnCancel = () => {
    this.props.history.push('/');
	}

  render() {
    return (
			<section className='RegisterPage'>
				<h2>Create an acount</h2>
				<RegisterForm
					onRegisterSuccess={this.handleRegisterSuccess}
					onClickOnCancel={this.handleClickOnCancel}
				/>
			</section>
		);
  }
}