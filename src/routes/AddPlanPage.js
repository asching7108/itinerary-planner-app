import React, { Component } from 'react';
import TripContext from '../context/TripContext';
import TripsApiService from '../services/trips-api-service';
import PlanForm from '../components/PlanForm/PlanForm';

export default class AddPlanPage extends Component {
	static contextType = TripContext;

	componentDidMount() {
		if (this.context.needToUpdate) {
			this.context.updateTrip(this.props.match.params.trip_id);
		}
	}

	handleAddPlanSuccess = plans => {
		this.context.updateTrip(plans[0].trip_id);

		const { history } = this.props;
		history.push(`/trip/${plans[0].trip_id}`);
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