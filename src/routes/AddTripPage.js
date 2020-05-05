import React, { Component } from 'react';
import TripForm from '../components/TripForm/TripForm';

export default class AddTripPage extends Component {
	handleAddTripSuccess = trip => {
		const { history } = this.props;
		history.push(`/trip/${trip.id}`);
	}

	handleClickOnCancel = () => {
		this.props.history.push('/');
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