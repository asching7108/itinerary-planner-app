import React, { Component } from 'react';
import TripListContext from '../context/TripListContext';
import TripForm from '../components/TripForm/TripForm';

export default class EditTripPage extends Component {
	static contextType = TripListContext;

	componentDidMount() {
		if (!this.context.tripList[0]) { this.context.updateTripList(); }
	}

	handleUpdateTripSuccess = trip => {
		const trip_id = this.props.match.params.trip_id;
		const { tripList, setTripList } = this.context;
		tripList.forEach((t, i) => {
			if (t.id === Number(trip_id)) {
				tripList[i] = trip;
			}
		})
		setTripList(tripList);

		const { history } = this.props;
		history.push(`/trip/${trip_id}`);
	}

	handleClickOnCancel = () => {
		this.props.history.goBack();
	}
	
	render() {
		const { tripList } = this.context;
		const trip_id = this.props.match.params.trip_id;
		const trip = tripList.find(t => t.id === Number(trip_id));
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