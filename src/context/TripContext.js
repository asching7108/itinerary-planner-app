import React, { Component } from 'react';
import TripsApiService from '../services/trips-api-service';

const TripContext = React.createContext({
	trip: {},
	planList: [],
	error: null,
	needToUpdate: true,
	updateTrip: () => {},
	setTrip: () => {},
	setPlanList: () => {},
	clearTrip: () => {},
	setError: () => {},
	clearError: () => {}
});

export default TripContext;

export class TripProvider extends Component {
	state = {
		trip: {},
		planList: [],
		error: null
	}

	needToUpdate = trip_id => {
		const { trip } = this.state;
		return Object.keys(trip).length === 0 || trip.id != trip_id;
	}

	updateTrip = trip_id => {
		this.clearError();

		TripsApiService.getTripById(trip_id)
			.then(this.setTrip)
			.catch(this.setError);

		TripsApiService.getTripPlans(trip_id)
			.then(this.setPlanList)
			.catch(this.setError);
	}

	setTrip = trip => {
		this.setState({ trip });
	}

	setPlanList = planList => {
		this.setState({ planList });
	}

	clearTrip = () => {
		this.setTrip({});
		this.setPlanList([]);
	}

	setError = error => {
		console.error(error);
		this.setState({ error });
	}

	clearError = () => {
		this.setState({ error: null });
	}

	render() {
		const contextValue = {
			trip: this.state.trip,
			planList: this.state.planList,
			error: this.state.error,
			needToUpdate: this.needToUpdate,
			updateTrip: this.updateTrip,
			setTrip: this.setTrip,
			setPlanList: this.setPlanList,
			clearTrip: this.clearTrip,
			setError: this.setError,
			clearError: this.clearError
		};

		return (
			<TripContext.Provider value={contextValue}>
				{this.props.children}
			</TripContext.Provider>
		);
	}
}