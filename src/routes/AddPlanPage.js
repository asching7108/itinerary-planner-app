import React, { Component } from 'react';
import TripContext from '../context/TripContext';
import PlanForm from '../components/PlanForm/PlanForm';

export default class AddPlanPage extends Component {
	static contextType = TripContext;

	handleAddPlanSuccess = plan => {
		const trip_id = this.props.match.params.trip_id;

    const { history } = this.props;
    history.push(`/trip/${trip_id}`);
	}

	handleClickOnCancel = () => {
		const { history } = this.props;
    history.goBack();
	}
	
	render() {
    return (
			<section className='AddPlanPage'>
				<h2>Create a plan</h2>
				<PlanForm 
					location={this.props.location}
					onAddPlanSuccess={this.handleAddPlanSuccess}
					onClickOnCancel={this.handleClickOnCancel}
				/>
			</section>
		);
  }
}