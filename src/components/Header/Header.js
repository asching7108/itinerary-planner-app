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
			<Link className='Header__link' to='/signin'>
				Sign in
			</Link>
		);
	}

	renderLogoutLink() {
		return (
			<Link 
				className='Header__link'
				onClick={this.handleLogoutClick}
				to='/'
			>
				Sign out
			</Link>
		);
	}

	render() {
		return (
			<>
				<nav className='Header'>
					<div className='Header__div'>
						<span className='Header__icon'>
							<Link to='/'><FontAwesomeIcon icon='paper-plane' /></Link>
						</span>
						<h1 className='Header__title'><Link to='/'>Vamos</Link></h1>
					</div>
					<span className='Header__tagline--wide'>- Itinerary Planner -</span>
					<div className='Header__div'>
						{this.context.hasAuthToken
							? this.renderLogoutLink()
							: this.renderLoginLink()}
					</div>
				</nav>
				<span className='Header__tagline--narrow'>- Itinerary Planner -</span>
			</>
		);
	}
}