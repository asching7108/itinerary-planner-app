import React, { Component } from 'react';
import TripContext from '../context/TripContext';
import TripForm from '../components/TripForm/TripForm';

export default class EditTripPage extends Component {
	static contextType = TripContext;

	componentDidMount() {
		const { trip_id } = this.props.match.params;
		if (this.context.needToUpdate(trip_id)) {
			this.context.updateTrip(trip_id);
		}
	}

	componentDidUpdate() {
		if (this.context.error) {
			this.props.history.push('/page-not-found');
		}
	}

	handleUpdateTripSuccess = trip => {
		const trip_id = this.props.match.params.trip_id;
		this.context.updateTrip(trip_id);

		const { history } = this.props;
		history.push(`/trip/${trip_id}`);
	}

	handleClickOnCancel = () => {
		this.props.history.goBack();
	}
	
	render() {
		const { trip } = this.context;
		return (
			<section className='EditTripPage'>
				<h2>Edit trip</h2>
				<TripForm 
					trip={trip}
					location={this.props.location}
					onUpdateTripSuccess={this.handleUpdateTripSuccess}
					onClickOnCancel={this.handleClickOnCancel}
				/>
			</section>
		);
	}
}