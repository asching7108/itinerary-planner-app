import React, { Component } from 'react';
import moment from 'moment';
import TripsApiService from '../services/trips-api-service';
import { formatDate } from '../components/Utils/Utils';

const TripListContext = React.createContext({
	upcomingTrips: [],
	pastTrips: [],
	hasAuthToken: false,
	error: null,
	updateTripList: () => {},
	setTripList: () => {},
	setPlanList: () => {},
	setError: () => {},
	clearError: () => {},
	setAuthState: () => {}
})

export default TripListContext;

export class TripListProvider extends Component {
	state = {
		upcomingTrips: [],
		pastTrips: [],
		error: null
	}

	updateTripList = () => {
		this.clearError();

		TripsApiService.getTripsByUser()
			.then(this.setTripList)
			.catch(this.setError);
	}

	setTripList = trips => {
		if (trips.length === 0) {
			this.setState({
				upcomingTrips: [],
				pastTrips: []
			});
		}
		else {
			const upcomingTrips = trips.filter(trip => 
				moment(formatDate(trip.end_date, 'YYYY-MM-DDTHH:mm:ss')).diff(moment().startOf('day')) >= 0
			);
			const pastTrips = trips.filter(trip => 
				moment(formatDate(trip.end_date, 'YYYY-MM-DDTHH:mm:ss')).diff(moment().startOf('day')) < 0
			);
			this.setState({
				upcomingTrips,
				pastTrips: pastTrips.reverse()
			});
		}
	}

	setError = error => {
		console.error(error);
		this.setState({ error });
	}

	clearError = () => {
		this.setState({ error: null });
	}

	setAuthState = hasAuthToken => {
		this.setState({ hasAuthToken });
	}

	render() {
		const contextValue = {
			upcomingTrips: this.state.upcomingTrips,
			pastTrips: this.state.pastTrips,
			hasAuthToken: this.state.hasAuthToken,
			error: this.state.error,
			updateTripList: this.updateTripList,
			setTripList: this.setTripList,
			setError: this.setError,
			clearError: this.clearError,
			setAuthState: this.setAuthState
		};

		return (
			<TripListContext.Provider value={contextValue}>
				{this.props.children}
			</TripListContext.Provider>
		);
	}
}