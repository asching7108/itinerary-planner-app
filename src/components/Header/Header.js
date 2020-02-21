import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';

export default class Header extends Component {
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
				<Link to='/'>
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
					{this.renderLoginLink()}
				</span>
			</nav>

			<span className='Header__tagline--narrow'>Itinerary Planner</span>
		</>
	}
}