import React, { Component } from 'react';
import TripListContext from '../context/TripListContext';
import TripForm from '../components/TripForm/TripForm';

export default class AddTripPage extends Component {
	static contextType = TripListContext;

	handleAddTripSuccess = trip => {
		const { tripList, setTripList } = this.context;
		tripList.push(trip);
		setTripList(tripList);

		const { history } = this.props;
		history.push(`/trip/${trip.id}`);
	}

	handleClickOnCancel = () => {
		this.props.history.goBack();
	}
	
	render() {
		return (
			<section className='AddTripPage'>
				<h2>Create a trip</h2>
				<TripForm 
					location={this.props.location}
					onAddTripSuccess={this.handleAddTripSuccess}
					onClickOnCancel={this.handleClickOnCancel}
				/>
			</section>
		);
	}
}