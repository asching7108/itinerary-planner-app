import React, { Component } from 'react';
import TripContext from '../context/TripContext';
import TripsApiService from '../services/trips-api-service';
import PlanForm from '../components/PlanForm/PlanForm';

export default class AddPlanPage extends Component {
	static contextType = TripContext;

	componentDidMount() {
		const { trip_id } = this.props.match.params;
		this.context.clearError();
		
		TripsApiService.getTripById(trip_id)
			.then(this.context.setTrip)
			.catch(this.context.setError);
	}

	componentWillUnmount() {
		this.context.clearTrip();
	}

	handleAddPlanSuccess = plan => {
		const trip_id = this.props.match.params.trip_id;

		const { history } = this.props;
		history.push(`/trip/${trip_id}`);
	}

	handleClickOnCancel = () => {
		this.props.history.goBack();
	}
	
	render() {
		return (
			<section className='AddPlanPage'>
				<h2>Create a plan</h2>
				<PlanForm 
					tripId={this.props.match.params.trip_id}
					destCities={this.context.trip.dest_cities}
					location={this.props.location}
					onAddPlanSuccess={this.handleAddPlanSuccess}
					onClickOnCancel={this.handleClickOnCancel}
				/>
			</section>
		);
	}
}