import React, { Component } from 'react';
import TripListContext from '../../context/TripListContext';
import TokenService from '../../services/token-service';
import TripItem from '../../components/TripItem/TripItem';
import { LinkButton } from '../../components/Utils/Utils';
import './TripListPage.css';

export default class TripListPage extends Component {
	static contextType = TripListContext;

	componentDidMount() {
		if (TokenService.hasAuthToken()) { this.context.updateTripList(); }
		else { this.context.setTripList([]); }
	}

	renderTrips() {
		const { tripList = [] } = this.context;
		if (!tripList.length) {
			return (
				<p className='TripListPage__no-trip'>
					You don't have any trip yet.
				</p>
			);
		}

		return (
			tripList.map(trip => 
				<TripItem
					key={trip.id}
					trip={trip}
					location={this.props.location}
				/>	
			)
		);
	}
	
	render() {
		return (
			<section className='TripListPage'>
				<h2>My trips</h2>
				<div className='TripListPage__trip-list'>
					{this.renderTrips()}
				</div>
				<LinkButton to={'/add-trip'}>
					Create a trip
				</LinkButton>
			</section>
		);
	}
}