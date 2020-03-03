import React, { Component } from 'react';

const TripContext = React.createContext({
	trip: {},
	planList: [],
	error: null,
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