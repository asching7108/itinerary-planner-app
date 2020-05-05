import React, { Component } from 'react';
import TripsApiService from '../services/trips-api-service';

const TripContext = React.createContext({
	trip: {},
	planList: [],
	error: null,
	needToUpdate: () => {},
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
		return Object.keys(trip).length === 0 || trip.id !== Number(trip_id);
	}

	updateTrip = (trip_id, cb) => {
		this.clearError();
		this.clearTrip();

		const p1 = TripsApiService.getTripById(trip_id)
			.then(trip => {
				this.setTrip(trip);
				return trip;
			})
			.catch(res => this.setError(res.error));

		const p2 = TripsApiService.getTripPlans(trip_id)
			.then(plans => {
				this.setPlanList(plans);
				return plans;
			})
			.catch(res => this.setError(res.error));

		Promise.all([p1, p2])
			.then(res => 
				(!!cb) && cb()
			);
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