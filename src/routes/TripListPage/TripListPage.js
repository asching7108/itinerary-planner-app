import React, { Component } from 'react';
import TripListContext from '../../context/TripListContext';
import TripItem from '../../components/TripItem/TripItem';
import { test_trips } from '../../data';
import { ButtonLikeLink } from '../../components/Utils/Utils';
import './TripListPage.css';

export default class TripListPage extends Component {
	static contextType = TripListContext;

	componentDidMount() {
		this.context.setTripList(test_trips);
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
				<ButtonLikeLink 
					to={'/add-trip'}
					className='add'
				>
					Create a trip
				</ButtonLikeLink>
			</section>
		);
  }
}