import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TripListContext from '../../context/TripListContext';
import TokenService from '../../services/token-service';
import IdleService from '../../services/idle-service';
import './Header.css';

export default class Header extends Component {
	static contextType = TripListContext;

	handleLogoutClick = () => {
		TokenService.clearAuthToken();
		TokenService.clearCallbackBeforeExpiry();
		IdleService.unRegisterIdleResets();
		this.context.setTripList([]);
		this.context.setAuthState(false);
	}
	
	renderLoginLink() {
		return (
			<div className='Header__sign-in'>
				<Link to='/signin'>
					Sign in
				</Link>
			</div>
		);
	}

	renderLogoutLink() {
		return (
			<div className='Header__sign-out'>
				<Link 
					onClick={this.handleLogoutClick}
					to='/'
				>
					Sign out
				</Link>
			</div>
		);
	}

	render() {
		return <>
			<nav className='Header'>
				<h1>
					<Link to='/'>
						<FontAwesomeIcon className='blue' icon='globe-asia' />
						Vamos
					</Link>
				</h1>
				<span className='Header__tagline--wide'>Itinerary Planner</span>
				<span className='Header__links'>
					{this.context.hasAuthToken
						? this.renderLogoutLink()
						: this.renderLoginLink()}
				</span>
			</nav>

			<span className='Header__tagline--narrow'>Itinerary Planner</span>
		</>
	}
}