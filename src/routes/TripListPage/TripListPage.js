import React, { Component } from 'react';
import TripListContext from '../../context/TripListContext';
import TokenService from '../../services/token-service';
import TripItem from '../../components/TripItem/TripItem';
import { LinkButton } from '../../components/Utils/Utils';
import './TripListPage.css';

export default class TripListPage extends Component {
	constructor(props) {
		super(props);
		this.state = { showPastTrips: false };
	}

	static contextType = TripListContext;

	componentDidMount() {
		if (TokenService.hasAuthToken()) { this.context.updateTripList(); }
		else { this.context.setTripList({}); }
	}

	renderUpcomingTrips() {
		if (!this.context.upcomingTrips.length) {
			return (
				<p className='TripListPage__no-trip'>You don't have any upcoming trip.</p>
			);
		}
		return this.renderTrips(this.context.upcomingTrips, 'upcoming');
	}

	renderPastTrips() {
		if (!this.context.pastTrips.length) { return; } 
		const { showPastTrips } = this.state;
		return (
			<>
				<button 
					className='TripListPage__past-ctrl'
					onClick={e => this.setState({ showPastTrips: !showPastTrips })}
				>
					{showPastTrips ? 'Past Trips' : 'Show Past Trips'}
				</button>
				{showPastTrips && this.renderTrips(this.context.pastTrips, 'past')}
			</>
		);
	}

	renderTrips(trips, text) {
		return (
			trips.map(trip => 
				<TripItem
					key={trip.id}
					trip={trip}
					location={this.props.location}
					text={text}
				/>	
			));
	}
	
	render() {
		return (
			<section className='TripListPage'>
				<h2 className='TripListPage__title'>Upcoming Trips</h2>
				<div className='TripListPage__trip-list'>
					{this.renderUpcomingTrips()}
					{this.renderPastTrips()}
				</div>
				<LinkButton to={'/add-trip'}>
					Create a trip
				</LinkButton>
			</section>
		);
	}
}