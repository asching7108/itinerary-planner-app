import React, { Component } from 'react';
import TripContext from '../context/TripContext';
import PlanForm from '../components/PlanForm/PlanForm';

export default class AddPlanPage extends Component {
	static defaultProps = { match: { params: '' } };

	static contextType = TripContext;

	componentDidMount() {
		if (this.context.needToUpdate()) {
			this.context.updateTrip(this.props.match.params.trip_id);
		}
	}

	componentDidUpdate() {
		if (this.context.error) {
			this.props.history.push('/page-not-found');
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
					trip={this.context.trip}
					location={this.props.location}
					onAddPlanSuccess={this.handleAddPlanSuccess}
					onClickOnCancel={this.handleClickOnCancel}
				/>
			</section>
		);
	}
}